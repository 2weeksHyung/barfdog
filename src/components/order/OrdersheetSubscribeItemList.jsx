import s from '/src/pages/order/ordersheet/ordersheet.module.scss';
import Spinner from '/src/components/atoms/Spinner';
import transformLocalCurrency from '/util/func/transformLocalCurrency';
import React from 'react';

export const OrdersheetSubscribeItemList = ({
  info,
  form,
  setForm,
  isLoading,
  orderType = 'general',
  event = { onActiveModal },
}) => {
  const onCancleCoupon = (e) => {
    const btn = e.currentTarget;
    const itemId = Number(btn.dataset.itemId);
    const appliedCouponId = Number(btn.dataset.appliedCouponId);

    if (orderType === 'general') {
      setForm((prevState) => ({
        ...prevState,
        orderItemDtoList: prevState.orderItemDtoList.map((itemObj) => {
          const updatedState = {
            ...itemObj,
            memberCouponId: null,
            discountAmount: 0,
          };
          return itemObj.itemId === Number(itemId) ? updatedState : itemObj;
        }),
        coupons: prevState.coupons.map((coupon) => {
          return coupon.memberCouponId === appliedCouponId
            ? {
                ...coupon,
                remaining: ++coupon.remaining,
              }
            : coupon;
        }),
      }));
    } else if (orderType === 'subscribe') {
      setForm((prevState) => ({
        ...prevState,
        memberCouponId: null,
        discountCoupon: 0,
        coupons: prevState.coupons.map((coupon) => {
          return coupon.memberCouponId === appliedCouponId
            ? {
                ...coupon,
                remaining: ++coupon.remaining,
              }
            : coupon;
        }),
      }));
    }
  };

  const onMouseEnterHandler = (e) => {
    const btn = e.currentTarget;
    btn.innerText = '적용 취소';
  };

  const onMouseLeaveHandler = (e) => {
    const btn = e.currentTarget;
    btn.innerText = '적용됨';
  };

  return (
    <>
      <section className={s.title_box}>
        <div className={s.title}>주문서</div>
      </section>

      <section className={s.content_box}>
        <div className={s.title}>주문내역</div>
        <div className={s.flex_title_box}>
          <div>상품정보</div>
          <div>수량</div>
          <div>총 주문금액</div>
          <div>쿠폰할인</div>
          <div>쿠폰적용</div>
        </div>
        <ul className={`${s['item-container']} ${s.subscribe}`}>
          {isLoading.item ? (
            <Spinner />
          ) : (
            <li className={s.flex_box}>
              <div className={s.info_col}>
                <p className={s.subscribeName}>[정기구독] {info.subscribeDto?.plan}</p>
                {info.recipeNames?.map((name) => (
                  <p className={s.recipeName}>{name}</p>
                ))}
              </div>

              <div className={s.count_col}>{1} 개</div>

              <div className={s.title_col}>총 주문금액</div>
              <div className={s.price_col}>
                <div className={s.price_inner}>
                  {transformLocalCurrency(info.subscribeDto?.originPrice)}원
                </div>
                <span>{transformLocalCurrency(info.subscribeDto?.nextPaymentPrice)}원</span>
              </div>

              <div
                className={`${s.coupon_col_red}`}
                style={{ color: !form.discountCoupon && 'var(--color-disabled)' }}
              >
                {form.discountCoupon && '-' + transformLocalCurrency(form.discountCoupon)}원
              </div>
              <div className={s.apply_coupon_col}>
                {form.discountCoupon ? (
                  <button
                    type={'button'}
                    className={`${s['btn']} ${s.applied}`}
                    data-modal-type={'coupons'}
                    data-item-id={info.subscribeDto.id}
                    data-applied-coupon-id={form.memberCouponId}
                    onClick={onCancleCoupon}
                    onMouseEnter={onMouseEnterHandler}
                    onMouseLeave={onMouseLeaveHandler}
                  >
                    적용됨
                  </button>
                ) : (
                  <button
                    type={'button'}
                    className={`${s['btn']}`}
                    data-modal-type={'coupons'}
                    data-item-id={form.coupons?.memberCouponId}
                    onClick={event.onActiveModal}
                  >
                    쿠폰 선택
                  </button>
                )}
              </div>
            </li>
          )}
        </ul>
      </section>
    </>
  );
};