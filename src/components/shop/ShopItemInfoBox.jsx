import Styles from '../../pages/shop/single.module.scss';
import Image from 'next/image';
import {ShopBotBox} from './ShopBotBox';
import React from 'react';

export const ShopItemInfoBox = () => {
  return (
    <>
      <section className={Styles.body_top_content}>
        <p className={Styles.top_content}>
          바프독은 15도 이하의 저온 살균 자체 시설에서 제조되어
          <br/>
          모든 레시피를 안전하고 신선하게 보내드립니다.
        </p>
        <div className={Styles.line}>
          <hr/>
        </div>
        
        <p className={Styles.red_title}>믿고 먹일 수 있는</p>
        
        <div className={Styles.title_box}>BARFDOG</div>
        <div className={Styles.title_contnet}>
          여러분은 삼시세끼 ‘라면’만 드실 수 있나요?
          <br/>
          <br/>
          반려견이 다양한 ‘사료’만 먹는다는 것은 곧 인스턴트 라면 혹은 건빵을 먹는 것과 같습니다.
          <br/>
          그래서 바프독은 고민했습니다. 진짜 반려견을 위한 음식은 무엇일지 연구하고 진짜 음식의
          본질에 집중했습니다. <br/>
          영양을 골고루 섭취할 수 있는 국내 최초 더블 고기 레시피에 리얼 바프식(barf) 생식을 반영한
          적절한 야채비율까지 더 했습니다.
          <br/>
          <br/>
          이제는 매일 먹는 ‘라면’과 ‘건빵’이 아닌
          <br/>
          신선하고 영양이 풍부한 생자연식을 골고루 선물해주세요.
        </div>
      </section>
      {/* 바디사진부분 */}
      <section className={Styles.body_image}>
        <div className={Styles.image_box}>
          <div className={`${Styles.image} img-wrap`}>
            <Image
              src={require( '/public/img/shop/single/shop_single_main_1.png' )}
              objectFit="cover"
              layout="fill"
              alt="카드 이미지"
            />
          </div>
          
          <p>함께 급여하면 좋아요</p>
          
          <div className={`${Styles.image2} img-wrap`}>
            <Image
              src={require( '/public/img/shop/single/shop_single_main_2.png' )}
              objectFit="cover"
              layout="fill"
              alt="카드 이미지"
            />
          </div>
        </div>
      </section>
      <section className={Styles.why_barf}>
        <p>왜 바프독일까요?</p>
        <div className={Styles.why_content_box}>
          <div className={Styles.left}>
            <div className={Styles.title_num}>01</div>
            <div className={Styles.title}>진짜 생식</div>
            <p>올바른 바프(BARF)식 영양구성</p>
            <div className={Styles.title_content}>한 팩에 완벽한 영양을 담았습니다.</div>
            <div className={Styles.left_box_content}>
              <div>70% 풍부하게 담은 두가지 고기</div>
              <div>10% 풍부한 칼슘</div>
              <div>10% 안전하게 맞춤 제조된 내장</div>
              <div>10% 유기농 야채와 신선한 과일</div>
            </div>
            <div className={Styles.last_contain}>
              그리고 유기농 씨앗과 켈프, 스피루리나
              <br/>의 프리미엄 영양소로 구성되어 있습니다.
              <br/> 바프독은 AAFCO, NRC, fediaf의
              <br/>
              가이드라인을 준수합니다.
            </div>
          </div>
          
          <div className={Styles.mid}>
            <div className={Styles.title_num}>01</div>
            <div className={Styles.title}>두가지 고기</div>
            <p>한가지 고기가 아닙니다</p>
            <div className={Styles.title_content}>
              바프독은 모든 레시피에 두가지
              <br/>
              고기를 풍부하게 담았습니다.
            </div>
            
            <div className={Styles.last_contain}>
              영양학 전문가들은 반려견 생식 급여시,
              <br/>
              한끼당 두가지 이상의고기를 섭취하도록
              <br/>
              권장합니다. 다양한 고기가 갖고있는 필수
              <br/>
              지방산 및 비타민 등을 골고루 섭취하면서
              <br/>
              균형잡힌 식사를 만들어주기 때문입니다.
              <br/>
              <br/>
              그래서 바프독은 모든 레시피에 두가지
              <br/>
              고기를 담아, 충분한 영양섭취를 돕습니다.
            </div>
          </div>
          <div className={Styles.right}>
            <div className={Styles.title_num}>01</div>
            <div className={Styles.title}>휴먼그레이드</div>
            <p>사람이 먹을 수 있는 음식</p>
            <div className={Styles.title_content}>
              바프독은 일반 고기보다 영양소가
              <br/>
              많은 방목고기를 사용합니다.
            </div>
            
            <div className={Styles.last_contain}>
              호주의 드넓은 초지에서 자유롭게
              <br/> 자라 유기농 인증을 받은 소고기와,
              <br/>
              뉴질랜드 천혜의 자연 환경에서 자유롭게
              <br/>
              자란 양고기를 사용합니다.
              <br/>
              <br/>
              바프독의 생자연식은 최고등급의 유기농
              <br/>
              방목고기, 채소를 사용하여 골고루 영양분
              <br/>을 섭취할 수있습니다.
            </div>
          </div>
        </div>
      </section>
      <section className={Styles.barf_note}>
        <div className={Styles.title}>BARFDOG’s Note</div>
        <p>
          진짜 펫푸드에 대한 바프독의 생각.
          <br/>
          바프독이 생각하는 본질을 그대로담았습니다.
        </p>
        
        <div className={Styles.content_box}>
          <div className={Styles.box_title}>우리가 먹을 수 있는 재료로만 만듭니다</div>
          
          <div className={Styles.image_box}>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_note_1.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_note_1-1.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
          </div>
        </div>
        
        <div className={Styles.content_box}>
          <div className={Styles.box_title}>100% 휴먼그레이드 프리미엄 생식</div>
          <div className={Styles.image2_box}>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_note_2-1.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_note_2-2.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_note_2-3.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_note_2-4.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_note_2-5.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_note_2-6.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className={Styles.barf_guide}>
        <div className={Styles.title}>BARFDOG’s Guide</div>
        <p>
          권장급여량은 걱정하지 마세요.
          <br/>
          입력해주신 아이들의 정보에 맞추어 <br className={Styles.p_br}></br>나누어 담아 드립니다.
        </p>
        <div className={Styles.red_word}>
          생식이 처음이라면 가이드라인과 <br className={Styles.p_br}></br> 급여가이드를 먼저
          참고하세요!
        </div>
        <div className={Styles.mid_box}>
          <ul className={Styles.guide_box}>
            {/* ////// */}
            <ShopBotBox title="급여가이드 보러가기">
              <div className={`${Styles.image_slide} img-wrap`}>
                <Image
                  src={require( '/public/img/shop/single/shop_main_guide_slide_1.png' )}
                  objectFit="cover"
                  layout="fill"
                  alt="카드 이미지"
                />
              </div>
            </ShopBotBox>
            <ShopBotBox title="생식 적응기간을 위한 가이드라인 보러가기">
              <div className={`${Styles.image_slide2} img-wrap`}>
                <Image
                  src={require( '/public/img/shop/single/shop_main_guide_slide_2.png' )}
                  objectFit="cover"
                  layout="fill"
                  alt="카드 이미지"
                />
              </div>
            </ShopBotBox>
          </ul>
        </div>
      </section>
      <section className={Styles.barf_tip}>
        <div className={Styles.title}>BARFDOG’s Tip</div>
        <div className={Styles.content_box}>
          <div className={Styles.left_box}>
            <div className={Styles.text_box}>
              레시피 <span>두가지를 골고루 급여</span>하여
              <br/>
              다양한 영양성분을 섭취 할 수 있도록 해주세요!
            </div>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                src={require( '/public/img/shop/single/shop_main_tip_left.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
            
            <div className={Styles.last_contain}>
              바프독은 반려견 생식 관련 역사가 오래된 미국 생식관련 반려동물 협회 및 미국
              생식전문사이트의 영양학전문수의사와 정기적인 미팅을 통하여 레시피를 까다롭게 검토하고
              있으며, 모든 전문가들의 공통된 의견을 존중하고 있습니다.
              <br/>
              <br/>
              따라서, 각 바프독 레시피가 가지고 있는 장점들을 골고루 섭취할 수 있도록 도와주는
              정기구독 서비스를 통해 반려견 친구들에게 보다 다양한 레시피를 급여해보시길
              추천드립니다.
            </div>
          </div>
          <div className={Styles.right_box}>
            <div className={`${Styles.image} img-wrap`}>
              <Image
                priority="false"
                src={require( '/public/img/shop/single/shop_main_tip_right.png' )}
                objectFit="cover"
                layout="fill"
                alt="카드 이미지"
              />
            </div>
          </div>
        </div>
      </section>
      <div className={Styles.mid_box}>
        <hr className={Styles.line}/>
      </div>
      <section className={Styles.barf_subscription}>
        <p className={Styles.title}>특별함을 일상처럼 매일먹는 특식,</p>
        <p className={Styles.title2}>Real Barf</p>
        
        <div className={`${Styles.image} img-wrap`}>
          <Image
            src={require( '/public/img/shop/single/shop_main_subscription.png' )}
            objectFit="cover"
            layout="fill"
            alt="카드 이미지"
          />
        </div>
      </section>
      
      {/* // ! ---------------------------------------------------- */}
      {/* // ! ---------------------급여가이드------------------------------- */}
      {/* // ! ---------------------------------------------------- // */}
      
      {/*
      <section className={`${Styles.bot} ${visible && Styles.active}`}>
        <BotBox title="급여가이드 보러가기">
          <div className={Styles.title_box}>
            <div className={Styles.title}>급여가이드</div>
          </div>

          <div className={Styles.content_title_box}>
            <div className={Styles.title}>올바르게 ‘급여’ 하기</div>
          </div>

          <div className={Styles.content}>
            <div className={Styles.grid}>
              <div>1</div>
              <div>
                생식이 너무 차가울경우 미지근한 물을 조금 넣어 찬기를 없애주세요
              </div>
              <div>2</div>
              <div>
                상온에서 20분 이내 급여하시고 20분이상 경과된 생식은 폐기하여
                주세요
              </div>
              <div>3</div>
              <div>
                급여 후 식사자리를 깨끗이 닦아 정리해주시고 위생적으로 관리하여
                주세요
              </div>
            </div>
          </div>

          <div className={Styles.content_title_box}>
            <div className={Styles.title}>올바르지 않은 해동법</div>
          </div>

          <div className={Styles.content2}>
            <div className={Styles.image_box}>
              <div className={Styles.left_box}>
                <div className={`${Styles.image} img-wrap`}>
                  <Image
                    src={require("/public/img/shop/single/shop_main_slide_1.png")}
                    objectFit="contain"
                    layout="fill"
                    alt="카드 이미지"
                  />
                </div>
              </div>
              <div className={Styles.image_text}>
                전자레인지, 뜨거운 물, 실온에서의 해동은 삼가주세요!
              </div>
            </div>

            <div className={Styles.content_text}>
              뼈가 들어간 제품이므로 절대로 열을 가하여 익히지 마세요
            </div>
          </div>

          <div className={Styles.content_title_box}>
            <div className={Styles.title}>신선하게 ‘보관’ 하기</div>
          </div>

          <div className={Styles.content3}>
            <div className={Styles.grid}>
              <div className={`${Styles.image} img-wrap`}>
                <Image
                  src={require("/public/img/shop/single/shop_main_slide_2-1.png")}
                  objectFit="contain"
                  layout="fill"
                  alt="카드 이미지"
                />
              </div>
              <div className={`${Styles.image} img-wrap`}>
                <Image
                  src={require("/public/img/shop/single/shop_main_slide_2-2.png")}
                  objectFit="contain"
                  layout="fill"
                  alt="카드 이미지"
                />
              </div>
              <div className={`${Styles.image} img-wrap`}>
                <Image
                  src={require("/public/img/shop/single/shop_main_slide_2-3.png")}
                  objectFit="contain"
                  layout="fill"
                  alt="카드 이미지"
                />
              </div>
              <div className={`${Styles.image} img-wrap`}>
                <Image
                  src={require("/public/img/shop/single/shop_main_slide_2-4.png")}
                  objectFit="contain"
                  layout="fill"
                  alt="카드 이미지"
                />
              </div>
              <div className={`${Styles.image} img-wrap`}>
                <Image
                  src={require("/public/img/shop/single/shop_main_slide_2-5.png")}
                  objectFit="contain"
                  layout="fill"
                  alt="카드 이미지"
                />
              </div>

              <div>식사는 도착 후 바로 냉동 보관 해주세요</div>
              <div>
                급여 하루 전 냉장실에서 해동 또는 급여 전 미지근한 물로
                해동해주세요
              </div>
              <div>한번 해동된 식사는 재냉동하지 마세요</div>
              <div>30시간 이상 지난 제품은 급여하지 마시고 폐기해주세요</div>
              <div>유통기한은 제조일로부터 3개월입니다, 꼭 지켜주세요!</div>
            </div>
          </div>
        </BotBox>
        <BotBox title="생식 적응기간을 위한 가이드라인 보러가기">
          <div className={Styles.title_box}>
            <div className={Styles.title}>
              생식 적응기간을 위한 가이드라인sss
            </div>
          </div>

          <div className={Styles.content4}>
            <div className={Styles.content}>
              <div className={Styles.grid}>
                <div className={Styles.mid_box}>
                  <div className={`${Styles.image} img-wrap`}>
                    <Image
                      src={require("/public/img/shop/single/shop_main_slide_3-1.png")}
                      objectFit="contain"
                      layout="fill"
                      alt="카드 이미지"
                    />
                  </div>
                </div>
                <div>
                  <p>DAY 1~2</p>
                  <br />

                  <div>
                    기존 사료에 바프독 레시피 두스푼을 넣어 급여해주세요.
                  </div>
                </div>

                <div className={Styles.mid_box}>
                  <div className={`${Styles.image} img-wrap`}>
                    <Image
                      src={require("/public/img/shop/single/shop_main_slide_3-2.png")}
                      objectFit="contain"
                      layout="fill"
                      alt="카드 이미지"
                    />
                  </div>
                </div>
                <div>
                  <p>DAY 3~5</p>
                  <br />

                  <div>
                    기존 사료에 바프독 레시피 25%정도를 섞어 급여해주세요.{" "}
                    <br />
                    (기존 식단 75%, 바프독 레시피 25%)
                  </div>
                </div>
                <div className={Styles.mid_box}>
                  <div className={`${Styles.image} img-wrap`}>
                    <Image
                      src={require("/public/img/shop/single/shop_main_slide_3-3.png")}
                      objectFit="contain"
                      layout="fill"
                      alt="카드 이미지"
                    />
                  </div>
                </div>
                <div>
                  <p>DAY 6~7</p>
                  <br />

                  <div>
                    기존 사료에 바프독 레시피 50%정도를 섞어 급여해주세요.{" "}
                    <br />
                    (기존 식단 50%, 바프독 레시피 50%)
                  </div>
                </div>

                <div className={Styles.mid_box}>
                  <div className={`${Styles.image} img-wrap`}>
                    <Image
                      src={require("/public/img/shop/single/shop_main_slide_3-4.png")}
                      objectFit="contain"
                      layout="fill"
                      alt="카드 이미지"
                    />
                  </div>
                </div>
                <div>
                  <p>DAY 8~9</p>
                  <br />

                  <div>
                    기존 사료에 바프독 레시피 75%정도를 섞어 급여해주세요.{" "}
                    <br />
                    (기존 식단 25%, 바프독 레시피 75%)
                  </div>
                </div>

                <div className={Styles.mid_box}>
                  <div className={`${Styles.image} img-wrap`}>
                    <Image
                      src={require("/public/img/shop/single/shop_main_slide_3-5.png")}
                      objectFit="contain"
                      layout="fill"
                      alt="카드 이미지"
                    />
                  </div>
                </div>
                <div>
                  <p>DAY 3~5</p>
                  <br />

                  <div>
                    기존 사료에 바프독 레시피 100%정도를 섞어 급여해주세요.{" "}
                    <br />
                    (기존 식단 0%, 바프독 레시피 100%)
                  </div>
                </div>
              </div>
              <div className={Styles.content5}>
                <div className={Styles.left_box}>
                  <div className={`${Styles.image} img-wrap`}>
                    <Image
                      src={require("/public/img/shop/single/shop_main_slide_4.png")}
                      objectFit="contain"
                      layout="fill"
                      alt="카드 이미지"
                    />
                  </div>
                </div>
                <div className={Styles.right_box}>
                  생식이 처음이거나 예민한 반려견의 경우 배탈, 묽은변, 구토
                  증상이 나타날 수 있으나 그럴땐 더욱 적은 양을 시작으로 새로운
                  음식에 적응할 때까지 천천히 생식의 양을 늘려주세요. 완벽한
                  전환에는 7~14일 정도 걸릴 수 있습니다 :)
                </div>
              </div>
            </div>
          </div>
        </BotBox>
      </section> */}
      {/* // ! ---------------------------------------------------- */}
      {/* // ! ---------------------급여가이드------------------------------- */}
      {/* // ! ---------------------------------------------------- */}
    </>
  );
};