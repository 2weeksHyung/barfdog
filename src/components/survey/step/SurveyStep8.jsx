import React, { useEffect, useState } from 'react';
import s from '/src/pages/survey/survey.module.scss';
import rem from '/util/func/rem';
import SurveyInputRadio from '/src/components/survey/SurveyInputRadio';
import { dogActivityLevelType } from '/store/TYPE/dogActivityLevelType';

export default function SurveyStep8({
  formValues,
  setFormValues,
  onInputChangeHandler,
  surveyPageRef,
}) {
  // UI '짤림 현상'해결
  useEffect(() => {
    const swiperWrap = surveyPageRef.current;
    const slideWithDependencyElem = swiperWrap.querySelector(
      '.swiper-slide-active',
    );
    const activeSlideHeight = slideWithDependencyElem.offsetHeight;
    const targetSwiperElem = swiperWrap.querySelector('.swiper-wrapper');
    targetSwiperElem.style.height = rem(activeSlideHeight);
    // targetSwiperElem.style.minHeight = rem(400);
  }, [formValues]);

  return (
    <section id="surveyPage" className={s.step7Page}>
      {formValues?.map((dog, index) => (
        <div key={index} className={s.status_container}>
          <div className={s.input_status_container}>
            <p className={s.input_title}>
              {dog.name} (이)의 활동량은 어떤가요 ?
            </p>
            <div className={s.input_activity_box}>
              <SurveyInputRadio
                dogInfo={dog}
                dogInfoIndex={index}
                formValueKey={'activityLevel'}
                formValues={formValues}
                setFormValues={setFormValues}
                className={s.activityLevel}
                onInputChangeHandler={onInputChangeHandler}
                idList={[
                  dogActivityLevelType.VERY_MUCH,
                  dogActivityLevelType.MUCH,
                  dogActivityLevelType.NORMAL,
                  dogActivityLevelType.LITTLE,
                  dogActivityLevelType.VERY_LITTLE,
                ]}
                labelList={[
                  dogActivityLevelType.KOR.VERY_MUCH,
                  dogActivityLevelType.KOR.MUCH,
                  dogActivityLevelType.KOR.NORMAL,
                  dogActivityLevelType.KOR.LITTLE,
                  dogActivityLevelType.KOR.VERY_LITTLE,
                ]}
                // defaultStyle
              />

              {/* <SurveyInputRadio
                formValueKey={'dogStatus'}
                formValues={formValues}
                setFormValues={setFormValues}
                dogInfo={dog}
                dogInfoIndex={index}
                className={s.dogStatus}
                idList={[
                  dogPhysicalStatusType.THIN,
                  dogPhysicalStatusType.HEALTHY,
                  dogPhysicalStatusType.NEED_DIET,
                  dogPhysicalStatusType.OBESITY,
                ]}
                labelList={[
                  dogPhysicalStatusType.KOR.THIN,
                  dogPhysicalStatusType.KOR.HEALTHY,
                  dogPhysicalStatusType.KOR.NEED_DIET,
                  dogPhysicalStatusType.KOR.OBESITY,
                ]}
              /> */}
            </div>
          </div>
          {formValues.length >= 2 && index !== formValues.length - 1 && (
            <div className={s.input_line}></div>
          )}
        </div>
      ))}
    </section>
  );
}