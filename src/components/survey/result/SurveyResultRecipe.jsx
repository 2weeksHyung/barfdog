import React, { useEffect, useState } from 'react';
import { SurveyRecipeInput } from './SurveyRecipeInput';
import Link from 'next/link';
import Image from 'next/image';
import s from './surveyStatistics.module.scss';
import popupWindow from '/util/func/popupWindow';
import { subscribePlanType } from '/store/TYPE/subscribePlanType';
import {
  ItemRecommendlabel,
  ItemSoldOutLabel,
} from '/src/components/atoms/ItemLabel';

export default function SurveyResultRecipe({
  surveyInfo,
  recipeInfo,
  recipeDoubleInfo,
  recipeSingleInfo,
  form,
  setForm,
}) {
  const [initialize, setInitialize] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState({}); // * 풀플랜: 최대 2가지 레시피 선택 가능 (Checkbox Input) // ex.{터키비프: true}
  const [inputType, setInputType] = useState(null);

  // 조건과 추천 레시피 ID를 매핑한 객체
  const conditionRecipeMap = {
    관절: [7, 9],
    '피부·모질': [8, 11],
    구토: [5, 9],
    빈혈: [6, 12],
    피로회복: [7, 11],
    체중조절: [8, 12],
    '음수량 부족': [5, 9],
  };

  // inedibleFood에 따른 레시피 제외 조건
  const inedibleFoodRecipeMap = {
    닭: [5, 9],
    칠면조: [5, 6, 10],
    소: [6, 8, 12],
    오리: [7],
    양: [7, 8, 11],
  };

  console.log(surveyInfo.priorityConcerns);

  // useEffect(() => {
  //   const selectedConditions = surveyInfo.priorityConcerns
  //     .split(',')
  //     .filter(Boolean);
  //   let recommendRecipeIds = [];

  //   selectedConditions.forEach((condition) => {
  //     if (conditionRecipeMap[condition]) {
  //       recommendRecipeIds.push(...conditionRecipeMap[condition]);
  //     }
  //   });

  //   recommendRecipeIds = [...new Set(recommendRecipeIds)]; // 중복 제거

  //   // inedibleFood에 포함된 재료의 레시피 ID를 제외
  //   const inedibleFoods = surveyInfo.inedibleFood.split(',').filter(Boolean);
  //   inedibleFoods.forEach((food) => {
  //     if (inedibleFoodRecipeMap[food]) {
  //       recommendRecipeIds = recommendRecipeIds.filter(
  //         (id) => !inedibleFoodRecipeMap[food].includes(id),
  //       );
  //     }
  //   });

  //   // recommendRecipeId의 최종 값
  //   const finalRecommendRecipeId = recommendRecipeIds.length
  //     ? recommendRecipeIds[0]
  //     : null;
  // }, []);

  useEffect(() => {
    setInitialize(true);
    setForm((prevState) => ({
      ...prevState,
      recipeIdList: [],
    }));
  }, [form.plan]);

  // useEffect(() => {
  //   // if (inputType !== 'radio') return; // ! 유효성체크 안할 경우, selectedCheckbox값에 영향끼침
  //   // const selectedId = recipeInfo.filter(
  //   //   (rc) => rc.name === `${selectedRadio && selectedRadio.split('-')[0]}`,
  //   // )[0]?.id;

  //   // // console.log(selectedId)
  //   setForm((prevState) => ({
  //     ...prevState,
  //     recipeIdList: [selectedId],
  //   }));
  //   // setSelectedRadio(`${selectedRadio}`);
  // }, [selectedRadio]);

  useEffect(() => {
    if (!selectedCheckbox) return;
    let selectedCheckboxCount = 0;
    const keys = Object.keys(selectedCheckbox);
    const selectedIdList = [];
    keys.forEach((key) => {
      const selectedId = recipeInfo.filter(
        (rc, index) => rc.name === `${selectedCheckbox && key.split('-')[0]}`,
      )[0]?.id;
      const val = selectedCheckbox[key];
      val && selectedCheckboxCount++;
      val
        ? selectedIdList.push(selectedId)
        : selectedIdList?.filter((id) => id !== selectedId);
    });

    // const selectedRadioCount = selectedRadio ? 1 : 0;
    // const totalSelectedCount = selectedCheckboxCount + selectedRadioCount;
    // const maxSelectedCount = 2;

    // if (totalSelectedCount > maxSelectedCount) {
    //   alert('최대 2개의 레시피만 선택 가능합니다.');
    //   return;
    // }

    console.log('selectedCheckboxCount', selectedCheckboxCount);
    //! [삭제]
    // const maxSelectedCheckboxCount = 2;
    // const isOverSelected = selectedCheckboxCount > maxSelectedCheckboxCount;
    // if (isOverSelected) {
    //   return alert('풀플랜은 최대 2개 레시피까지 선택가능합니다.');
    // }

    // setInitialize(isOverSelected);
    setForm((prevState) => ({
      ...prevState,
      recipeIdList: selectedIdList,
    }));
  }, [selectedCheckbox]);

  const onPopupHandler = (e) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    const href = e.currentTarget.href;
    popupWindow(href, { width: 1000, height: 716 });
  };

  return (
    <div className={s.recipe_container}>
      <div className={s.recipe_title}>
        {surveyInfo.myDogName} (을)를 위한 <span>레시피</span>를 선택해 주세요
        <div className={s.recipe_title_info}>
          <strong>최대 2가지</strong>까지 레시피 선택이 가능합니다
        </div>
      </div>

      {/* 3-1) 더블 */}
      <div className={s.recipe_box}>
        <h3>[ 더블미트(복합 단백질) 레시피 ]</h3>

        <div className={s.recipe_list}>
          {recipeDoubleInfo.map((recipe, index) => (
            <>
              <SurveyRecipeInput
                id={`${recipe.name}-${recipe.id}`}
                type={inputType}
                name={name}
                initialize={initialize}
                disabled={!recipe.inStock}
                selectedCheckbox={selectedCheckbox}
                setSelectedCheckbox={setSelectedCheckbox}
                option={{ label: '레시피 선택' }}
              >
                {surveyInfo.recommendRecipeName === recipe.name && (
                  <ItemRecommendlabel
                    label="추천!"
                    style={{
                      backgroundColor: '#000',
                    }}
                  />
                )}
                <Image
                  src={recipe.thumbnailUri2}
                  width={149 * 1.4}
                  height={149 * 1.4}
                  alt="레시피 상세 이미지"
                />
                <div>{recipe.uiNameKorean}</div>
                <div className={s.recipe_description}>
                  · 주재료: {recipe.ingredientList.join(', ')} <br />·{' '}
                  {recipe.name === 'STARTER PREMIUM +'
                    ? '첫 생식에 추천'
                    : recipe.name === 'TURKEY&BEEF +'
                    ? '성장기 자견에게 추천'
                    : recipe.name === 'DUCK&LAMB +'
                    ? '기력회복이 필요하다면 추천'
                    : recipe.name === 'LAMB&BEEF +'
                    ? '푸석푸석한 모질이라면 추천'
                    : ''}
                  <br />·{' '}
                  {recipe.name === 'STARTER PREMIUM +'
                    ? '부드러워 소화에 적은 부담'
                    : recipe.name === 'TURKEY&BEEF +'
                    ? '영양 보충 & 면역력 강화'
                    : recipe.name === 'DUCK&LAMB +'
                    ? '관절 강화 & 근력 회복'
                    : recipe.name === 'LAMB&BEEF +'
                    ? '윤기나는 피부와 모질'
                    : ''}
                </div>
                <button>
                  <Link href="/recipes" passHref>
                    <a
                      target={'_blank'}
                      rel={'noreferrer'}
                      onClick={onPopupHandler}
                    >
                      자세히 알아보기
                    </a>
                  </Link>
                </button>
              </SurveyRecipeInput>
            </>
          ))}
        </div>
      </div>

      {/* 3-2) 싱글 */}
      <div className={s.recipe_box}>
        <h3> [ 싱글미트(단일 단백질) 레시피 ]</h3>
        <div className={s.recipe_list}>
          {recipeSingleInfo.map((recipe, index) => (
            <>
              <SurveyRecipeInput
                id={`${recipe.name}-${recipe.id}`}
                type={inputType}
                name={name}
                initialize={initialize}
                disabled={!recipe.inStock}
                selectedCheckbox={selectedCheckbox}
                setSelectedCheckbox={setSelectedCheckbox}
                option={{ label: '레시피 선택' }}
              >
                {surveyInfo.recommendRecipeName === recipe.name && (
                  <ItemRecommendlabel
                    label="추천!"
                    style={{
                      backgroundColor: '#000',
                    }}
                  />
                )}
                <Image
                  src={recipe.thumbnailUri2}
                  width={149 * 1.5}
                  height={149 * 1.5}
                  alt="레시피 상세 이미지"
                />
                <div>{recipe.uiNameKorean}</div>
                <div className={s.recipe_description}>
                  · 주재료: {recipe.ingredientList.join(', ')} <br />·{' '}
                  {recipe.name === 'Premium CHICKEN'
                    ? '자견~노견, 전 연령 추천'
                    : recipe.name === 'Premium TURKEY'
                    ? '성장기 자견에게 추천'
                    : recipe.name === 'Premium LAMB'
                    ? '활동량이 많다면 추천'
                    : recipe.name === 'Premium BEEF'
                    ? '자견~노견, 전 연령 추천'
                    : ''}
                  <br />·{' '}
                  {recipe.name === 'Premium CHICKEN'
                    ? '관절 강화 & 소화 흡수율 높음'
                    : recipe.name === 'Premium TURKEY'
                    ? '영양 보충 & 면역력 강화'
                    : recipe.name === 'Premium LAMB'
                    ? '피로회복 & 피모관리'
                    : recipe.name === 'Premium BEEF'
                    ? '체중관리 & 빈혈회복'
                    : ''}
                </div>
                <button>자세히 알아보기</button>
              </SurveyRecipeInput>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}