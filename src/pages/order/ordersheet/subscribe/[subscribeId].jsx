import React, { useEffect, useState } from 'react';
import Layout from '/src/components/common/Layout';
import MetaTitle from '/src/components/atoms/MetaTitle';
import s from '../ordersheet.module.scss';
import Modal_termsOfSerivce from '/src/components/modal/Modal_termsOfSerivce';
import { Modal_coupon } from '/src/components/modal/Modal_coupon';
import { getData, postUserObjData } from '/src/pages/api/reqData';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import transformDate, { transformToday } from '/util/func/transformDate';
import { OrdersheetSubscribeItemList } from '/src/components/order/OrdersheetSubscribeItemList';
import { OrdersheetMemberInfo } from '/src/components/order/OrdersheetMemberInfo';
import { OrdersheetDeliveryForm } from '/src/components/order/OrdersheetDeliveryForm';
import { Payment } from '/src/components/order/Payment';
import { OrdersheetReward } from '/src/components/order/OrdersheetReward';
import { OrdersheetMethodOfPayment } from '/src/components/order/OrdersheetMethodOfPayment';
import { OrdersheetAmountOfPayment } from '/src/components/order/OrdersheetAmountOfPayment';
import { calcNextSubscribeDeliveryDate } from '/util/func/calcNextSubscribeDeliveryDate';
import { subscribePlanType } from '/store/TYPE/subscribePlanType';

const DUMMY_MEMEBER_COUPON_LIST = [
  {
    memberCouponId: 45,
    name: '50%할인쿠폰 ',
    discountType: 'FIXED_RATE',
    discountDegree: 70,
    availableMaxDiscount: 1000000,
    availableMinPrice: 5000,
    remaining: 1,
    expiredDate: '2023-12-31T23:59:59',
  },
  {
    memberCouponId: 46,
    name: '쿠폰2-최대할인 금액 1만원 조건 ',
    discountType: 'FLAT_RATE',
    discountDegree: 2000,
    availableMaxDiscount: 100000,
    availableMinPrice: 0,
    remaining: 3,
    expiredDate: '2023-12-31T23:59:59',
  },
  {
    memberCouponId: 47,
    name: '쿠폰3-최대 할인가3천원',
    discountType: 'FIXED_RATE',
    discountDegree: 30,
    availableMaxDiscount: 3000,
    availableMinPrice: 0,
    remaining: 3,
    expiredDate: '2023-12-31T23:59:59',
  },
];

export default function SubscribeOrderSheetPage({ subscribeId }) {
  const router = useRouter();
  const auth = useSelector((s) => s.auth);
  const USER_TYPE = auth.userType;

  const cart = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState({ fetching: true });
  const [isRendered, setIsRendered] = useState(false);
  const [info, setInfo] = useState({});
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activeModal, setActiveModal] = useState({
    termsOfService: false,
    coupon: false,
  });

  useEffect(() => {
    if (window && typeof window !== 'undefined') {
      setIsRendered(true);
    }
  }, []);

  useEffect(() => {
    // const curItem = cart.subscribeOrder; // ! subscribe Item
    // if (!Object.keys(curItem).length || !subscribeId) {
    //   return window.location.href='/';
    // }

    // ! surveyReportID가 곧 subscribeId가 되는것인지?????
    (async () => {
      setIsLoading((prevState) => ({
        ...prevState,
        item: true,
      }));
      try {
        // API: 구독 주문서에 필요한 내용 조회 ( ! Q. subscribeId는 매 구독 회차마다 생성 or 갱신 ?)
        const postItemInfoApiUrl = `/api/orders/sheet/subscribe/${subscribeId}`;
        const body = {
          id: subscribeId,
        };
        const res = await getData(postItemInfoApiUrl, body);
        // console.log(res)
        if (res.status !== 200) {
          alert('주문 정보를 확인할 수 없습니다.');
          return (window.location.href = '/');
        }
        const info = res.data;
        console.log(info);

        // 주문에 대한 모든 데이터
        const initInfo = {
          subscribeDto: {
            id: info.subscribeDto.id,
            plan: info.subscribeDto.plan,
            nextPaymentPrice: info.subscribeDto.nextPaymentPrice,
            originPrice: calcSubscribePlanOriginPrice(
              info.subscribeDto.plan,
              info.subscribeDto.nextPaymentPrice,
            ).originPrice,
          },
          recipeNameList: info.recipeNameList, // [] 구독으로 선택한 레시피 이름 리스트 // FULL-PLAN일 경우, 최대 2개
          name: info.name, // 구매자
          email: info.email, // 연락처
          phone: info.phoneNumber,
          grade: info.grade, // ! SUBSCRIBE ONLY
          gradeDiscountPercent: info.gradeDiscountPercent, // ! SUBSCRIBE ONLY
          address: {
            city: info.address.city, // 시도
            street: info.address.street, // 도로명 주소
            detailAddress: info.address.detailAddress, // 상세주소
            zipcode: info.address.zipcode, // 우편번호
          },
          deliveryPrice: 0, // 정기구독 배송비: 무료
          reward: info.reward || 200000, // !  ------- TEST
          brochure: info.brochure, // 브로슈어 받은 적 있는지 true/false => 브로슈어는 1번만 받을 수 있다.
        };

        // FormDatas
        const initForm = {
          selfInfo: {
            reward: info.reward || 200000, //  ! ------- TEST
          },
          // ! DUMMY DATA
          coupons:
            DUMMY_MEMEBER_COUPON_LIST ||
            info.coupons?.map((cp) => ({
              memberCouponId: cp.memberCouponId,
              name: cp.name,
              discountType: cp.discountType,
              discountDegree: cp.discountDegree,
              availableMaxDiscount: cp.availableMaxDiscount,
              availableMinPrice: cp.availableMinPrice,
              remaining: cp.remaining,
              expiredDate: transformDate(cp.expiredDate),
            })) ||
            [],
          deliveryDto: {
            name: null, // 수령자 이름 ("정기배송과" 묶음 배송일 경우, null => 정기배송 수령자를 따름)
            phone: null, // 수령자 전화번호 (묶음 배송일 경우, null)
            zipcode: null, // 우편번호 (묶음 배송일 경우, null)
            street: null, // 도로명 주소 (묶음 배송일 경우, null)
            detailAddress: null, // 상세주소 (묶음 배송일 경우, null)
            request: null, // 배송 요청사항 (묶음 배송일 경우, null)
          },
          orderPrice: info.subscribeDto.nextPaymentPrice,
          deliveryPrice: 0, // 배송비
          discountTotal: 0, // 총 할인 합계
          discountReward: 0, // 사용할 적립금
          discountCoupon: 0, // 쿠폰 적용으로 인한 할인금
          paymentPrice: info.subscribeDto.nextPaymentPrice, // 최종 결제 금액
          paymentMethod: null, // 결제방법  [CREDIT_CARD, NAVER_PAY, KAKAO_PAY]
          nextDeliveryDate: calcNextSubscribeDeliveryDate(transformToday(), null), // 배송 예정일 'yyyy-MM-dd'
          agreePrivacy: false, // 개인정보 제공 동의
          brochure: false, // 브로슈어 수령여부
        };
        setInfo(initInfo);
        setForm(initForm);
      } catch (err) {
        console.error(err);
      }

      setIsLoading((prevState) => ({
        ...prevState,
        item: false,
      }));
    })();
  }, [cart]);

  const onActivleModalHandler = (e) => {
    const button = e.currentTarget;
    const modalType = button.dataset.modalType;
    const selectedItemId = button.dataset.itemId;
    setSelectedItemId(selectedItemId);
    setActiveModal((prevState) => ({
      ...prevState,
      [modalType]: !prevState[modalType],
    }));
  };

  // validation
  // - 1. 상품정보 없이 , 해당 페이지에 접근했을 경우
  // - 2. 새로고침했을 경우 : REDUX정보 초기화됨
  //    > 이때, Shop Item Detail페이지에서 가져온 정보 초기화되어, 서버에서 데이터 가져올 수 없음)
  // if (!info || !USER_TYPE || USER_TYPE === userType.NON_MEMBER) return;

  return (
    <>
      <MetaTitle title="정기구독 주문서" />
      <Layout>
        <div className={s.container_outer}>
          <div className={s.Wrapper}>
            {form && (
              <OrdersheetSubscribeItemList
                orderType={'subscribe'}
                info={info}
                form={form}
                setForm={setForm}
                isLoading={isLoading}
                event={{ onActiveModal: onActivleModalHandler }}
              />
            )}
            <OrdersheetMemberInfo info={info} />
            {isRendered && (
              <OrdersheetDeliveryForm
                orderType={'subscribe'}
                info={info}
                form={form}
                setForm={setForm}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
              />
            )}
            <OrdersheetReward
              orderType={'subscribe'}
              id={'discountReward'}
              info={info}
              form={form}
              setForm={setForm}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
            <OrdersheetMethodOfPayment
              id={'paymentMethod'}
              orderType={'subscribe'}
              info={info}
              form={form}
              setForm={setForm}
              formErrors={formErrors}
            />
            <OrdersheetAmountOfPayment
              orderType={'subscribe'}
              info={info}
              form={form}
              setForm={setForm}
              event={{ onActiveModal: onActivleModalHandler }}
              formErrors={formErrors}
            />
            <section className={s.final_btn}>
              <p>위 주문 내용을 확인 하였으며, 회원 본인은 결제에 동의합니다.</p>
              <Payment
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                info={info}
                form={form}
                setFormErrors={setFormErrors}
                orderType={'subscribe'}
              />
              {/* 결제버튼 */}
            </section>
          </div>
        </div>
      </Layout>
      {activeModal.termsOfService && (
        <Modal_termsOfSerivce
          modalState={activeModal.termsOfService}
          setModalState={setActiveModal}
        />
      )}
      {activeModal.coupons && (
        <Modal_coupon
          orderType={'subscribe'}
          data={{ selectedItemInfo: info.subscribeDto, ...form }}
          onModalActive={setActiveModal}
          setForm={setForm}
        />
      )}
    </>
  );
}

export const calcSubscribePlanOriginPrice = (planName, paymentPrice) => {
  const discountPercent = subscribePlanType[planName].discountPercent; // 할인율 / 어드민설정이 아닌 고정값
  let calcPrice = paymentPrice * (100 / (100 - discountPercent));
  const cutOffUnit = 10;
  const originPrice = Math.floor(calcPrice / cutOffUnit) * cutOffUnit;

  return {
    originPrice,
  };
};

export async function getServerSideProps({ query }) {
  const { subscribeId } = query;
  return { props: { subscribeId: subscribeId || null } };
}