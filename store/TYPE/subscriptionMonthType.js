export const subscriptionMonthType = {
  TWELVE: {
    VALUE: 12, //! 서버에 전송할 값 (개월수)
    KOR: '12개월 패키지',
    discount: 20, // 할인율 (%)
    freeKit: 2, // 무료 진단기기 횟수
    freeTopper: 2, // 무료 토퍼랜덤 횟수
    freeSkip: true, // 무제한 건너뛰기
    freeDelivery: true, // 무료 배송
    fullDeliveryCount: 26, // 풀플랜 무료배송 횟수
    halfDeliveryCount: 13, // 하프플랜 무료배송 횟수
  },
  SIX: {
    VALUE: 6,
    KOR: '6개월 패키지',
    discount: 15,
    freeKit: 1,
    freeTopper: 1,
    freeSkip: true,
    freeDelivery: true,
    fullDeliveryCount: 13,
    halfDeliveryCount: 6,
  },
  THREE: {
    VALUE: 3,
    KOR: '3개월 패키지',
    discount: 5,
    freeKit: false,
    freeTopper: false,
    freeSkip: true,
    freeDelivery: true,
    fullDeliveryCount: 6,
    halfDeliveryCount: 3,
  },
  ONE: {
    VALUE: null,
    KOR: '정기 구독',
    discount: false,
    freeKit: false,
    freeTopper: false,
    freeSkip: true,
    freeDelivery: true,
  },
};