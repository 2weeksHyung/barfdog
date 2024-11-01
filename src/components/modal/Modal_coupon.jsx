import s from './modal_coupon.module.scss';
import React, {useCallback, useState} from 'react';
import ModalWrapper from './ModalWrapper';
import transformDate from '/util/func/transformDate';
import { discountUnitType } from '/store/TYPE/discountUnitType';
import transformLocalCurrency from '/util/func/transformLocalCurrency';
import {calcOrdersheetPrices} from "../order/calcOrdersheetPrices";
import EmptyMessage from "../atoms/AmdinErrorMessage";

export const Modal_coupon = ({ onModalActive, itemInfo, info,  form, setForm, orderType ='general' }) => {

  const [selectedRadioInfo, setSelectedRadioInfo] = useState(null);

  // Selected Item Info
  let selectedItemPrice;
  const selectedItemId = Number(itemInfo.id);

  if(orderType=== 'general'){
    selectedItemPrice = form.orderItemDtoList.filter(
      (item) => item.itemId === selectedItemId,
    )[0].orderLinePrice;
  }else if ( orderType === 'subscribe'){
    selectedItemPrice = itemInfo.nextPaymentPrice
  }

  const onChangeHandler = useCallback((e) => {
    const radio = e.currentTarget;
    const radioId = radio.id;
    const couponId = Number(radio.dataset.couponId);
    const couponDiscountAmount = Number(radio.dataset.discountAmount);
    const availableCouponMaxDiscount = calcOrdersheetPrices(form, orderType, {deliveryFreeConditionPrice: info.freeCondition})?.availableMaxDiscount.coupon;
    if(availableCouponMaxDiscount <= 0){
      return alert("최소결제금액에 도달하여, 할인 쿠폰을 적용할 수 없습니다.")
    }
    setSelectedRadioInfo((prevState) => ({
      ...prevState,
      id: radioId,
      couponId,
      couponDiscountAmount
    }));
  },[form, orderType]);

  const onApplyingCoupon = useCallback(
    () => {
      if(!selectedRadioInfo) return alert('선택된 쿠폰이 없습니다.');
      const { couponId, couponDiscountAmount} = selectedRadioInfo;

      if(orderType=== 'general') {
        setForm(prevState => ({
          ...prevState,
          orderItemDtoList: prevState.orderItemDtoList.map((item)=>{
            const updatedState = {
              ...item,
              memberCouponId: couponId,
              discountAmount: couponDiscountAmount,
              orderLinePrice: item.orderLinePrice - couponDiscountAmount
            }
            return item.itemId ===  selectedItemId ? updatedState : item
          }),
          coupons: prevState.coupons.map((coupon)=>coupon.memberCouponId === couponId ? {
            ...coupon,
            remaining: --coupon.remaining
          } : coupon)
        }));
      } else if (orderType === 'subscribe') {
        setForm(prevState => ({
          ...prevState,
          memberCouponId: couponId,
          discountCoupon: couponDiscountAmount,
          coupons: prevState.coupons.map((coupon)=>coupon.memberCouponId === couponId ? {
            ...coupon,
            remaining: --coupon.remaining
          } : coupon),
        }))
      }
      onHideModal();
    },
    [selectedRadioInfo, orderType, selectedItemId],
  );


  const onHideModal = () => {
    onModalActive((prevState) => ({
      ...prevState,
      coupons: false,
    }));
  };

  if (!Object.keys(form).length)
    return console.error('Faild to render because of empty data props');



  return (
    <>
      <ModalWrapper
        background
        onBackgroundClick={onHideModal}
        className={s['modal-container']}
        positionCenter
      >
        <section className={s.modal}>
          <div className={s.title_box}>
            <div className={s.title}>
              적용가능쿠폰 <span>쿠폰은 최대 1장까지 적용가능합니다.</span>
            </div>
          </div>
          <div className={s.content_box}>
            <div className={`${s.flex_box} ${s.header}`}>
              <span className={s.coupon_title}>쿠폰명</span>
              <span>적용가능수량</span>
              <span>유효기간</span>
              <span>할인금액</span>
            </div>
          </div>
          <div className={s.content_box}>
            {form.coupons?.length === 0
              ? <EmptyMessage text={'사용가능한 쿠폰이 없습니다.'} />
              : form.coupons.filter(item=>{
                // 1. SET Coupon Info
                item.couponId = `coupon-${item.memberCouponId}`;
                let couponDiscountAmount = 0;
                let couponDiscountInfo;
                if (item.discountType === discountUnitType.FLAT_RATE) {
                  couponDiscountInfo =
                    transformLocalCurrency(item.discountDegree) + discountUnitType.KOR.FLAT_RATE;
                  couponDiscountAmount = item.discountDegree;
                } else if (item.discountType === discountUnitType.FIXED_RATE) {
                  couponDiscountInfo = item.discountDegree + discountUnitType.KOR.FIXED_RATE;
                  couponDiscountAmount = Math.floor((selectedItemPrice * item.discountDegree) / 100); //쿠폰 할인 계산 시, 소수점 버림
                }
                item.couponDiscountInfo = couponDiscountInfo
                item.couponDiscountAmount = couponDiscountAmount
                // // console.log(couponDiscountAmount)

                // STEP 2. Validation
                let valid = false;
                if(item.remaining > 0 && selectedItemPrice >= item.availableMinPrice && couponDiscountAmount <= item.availableMaxDiscount) {
                  // 쿠폰 사용조건 : 1. 재고있음 2. 아이템가격이 최소사용금액보다 큼  3. 쿠폰할인가가 쿠폰에 설정된 최대 사용가능가격보다 낮음
                  valid = true;
                }
                return valid && item;

              }).map((item) =>(
                <label
                  key={item.couponId}
                  className={`${s.flex_box} ${s.coupons}`}
                  htmlFor={item.couponId}
                >
                      <span className={s.radio}>
                        <input
                          id={item.couponId}
                          data-coupon-id={item.memberCouponId}
                          data-discount-amount={item.couponDiscountAmount}
                          type="radio"
                          name={'coupon'}
                          onChange={onChangeHandler}
                          checked={selectedRadioInfo?.id === item.couponId}
                        />
                      </span>

                  <span className={s.name}>{`${item.name} (${item.couponDiscountInfo})`}</span>
                  <span className={s.count}>{item.remaining}개</span>
                  <span className={s.date}>{transformDate(item.expiredDate)}</span>
                  <span className={s.price}>
                        {transformLocalCurrency(item.couponDiscountAmount)}원 할인
                      </span>
                </label>
              ))}
          </div>
          <div className={s.btn_box}>
            <button type={'button'} className={s.cancle_btn} onClick={onHideModal}>
              취소
            </button>
            <button type={'button'} className={s.choice_btn} onClick={onApplyingCoupon}>
              쿠폰적용
            </button>
          </div>
        </section>
      </ModalWrapper>
    </>
  );
};
