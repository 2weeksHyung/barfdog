import React, { useEffect, useState } from 'react';
import s from '/src/pages/survey/survey.module.scss';
import SurveyInputRadio from '/src/components/survey/SurveyInputRadio';
import { CustomSelectWithCustomOptions } from './CustomSelectWithCustomOptions';
import { DogTypeCustomSelectWithCustomOptions } from './DogTypeCustomSelectWithCustomOptions';
import PureCheckbox from '/src/components/atoms/PureCheckbox';
import CustomRadioTrueOrFalse from '/src/components/admin/form/CustomRadioTrueOrFalse';
import { dogBreedType } from '/store/TYPE/dogBreedType.js';
import { dogGenderType } from '/store/TYPE/dogGenderType';
import { dogSizeType } from '/store/TYPE/dogSizeType';
import yearOptionList from '/util/func/yearOptionList';

export default function SurveyStep1({ formValues, setFormValues, onInputChangeHandler }) {
  const [birth, setBirth] = useState('');

  useEffect(() => {
    const yyyymm = [];
    for (const key in birth) {
      const val = birth[key];
      switch (key) {
        case 'yyyy':
          yyyymm[0] = val;
          break;
        case 'mm':
          yyyymm[1] = val;
          break;
      }
    }
    setFormValues((prevState) => ({
      ...prevState,
      birth: yyyymm.join(''),
    }));
  }, [birth]);

  const yearOptions = yearOptionList(50, true).year;
  const monthOptions = yearOptionList(null, true).month;


  return (
    <section className={s.step1Page}>
      <div className={s['input-row']}>
        <label htmlFor={'name'}>
          <p className={s.input_title}>반려견 이름</p>
          <input
            id={'name'}
            className={`${s.input_underLine} ${s['focus-underline']}`}
            type="text"
            placeholder="이름을 입력해주세요"
            data-input-type={'string'}
            value={formValues.name || ''}
            onChange={onInputChangeHandler}
          />
        </label>
      </div>
      <div className={s['input-row']}>
        <div className={s.input_title}>반려견 성별</div>
        <SurveyInputRadio
          formValueKey={'gender'}
          formValues={formValues}
          setFormValues={setFormValues}
          className={s.radio_gender}
          idList={[dogGenderType.MALE, dogGenderType.FEMALE]}
          labelList={['수컷', '암컷']}
        />
      </div>
      <div className={s['input-row']}>
        <div className={s.input_title}>반려견 출생년월</div>
        <ul className={s.dogBirth}>
          <li>
            <CustomSelectWithCustomOptions
              id={'yyyy'}
              options={yearOptions}
              value={formValues.birth.length >= 4 && formValues.birth.slice(0,4)}
              setValues={setBirth}
              unit={'년'}
              width={120}
              placeholder={'yyyy'}
            />
          </li>
          <li>
            <CustomSelectWithCustomOptions
              id={'mm'}
              options={monthOptions}
              value={formValues.birth.slice(4,6)}
              setValues={setBirth}
              unit={'월'}
              width={120}
              placeholder={'mm'}
            />
          </li>
        </ul>
        <div className={s.oldDog}>
          <PureCheckbox
            id={'oldDog'}
            theme={'circle'}
            value={formValues.oldDog || ''}
            setValue={setFormValues}
          >노령견입니다.</PureCheckbox>
        </div>
      </div>

      <div className={s['input-row']}>
        <SurveyInputRadio
          formValueKey={'dogSize'}
          formValues={formValues}
          setFormValues={setFormValues}
          className={s.dog_choice}
          idList={[dogSizeType.SMALL, dogSizeType.MIDDLE, dogSizeType.LARGE]}
          labelList={['소형견', '중형견', '대형견']}
          
        />
      </div>

      <div className={s['input-row']}>
        <div className={s.input_title}>견종선택</div>

        <DogTypeCustomSelectWithCustomOptions
          id={'dogType'}
          options={dogBreedType.map((dogType) => ({label:dogType.label, value: dogType.value }))}
          value={formValues}
          setFormValues={setFormValues}
          width={360}
        />
      </div>
      <div className={s['input-row']}>
        <label htmlFor={'weight'}>
          <div className={s.input_title}>반려견 몸무게</div>
          <div className={s.flex_box}>
            <div className={s.inner_kg}>
              <input
                id={'weight'}
                type="text"
                name="survey"
                data-input-type={'number, demicals-1, ints-2'}
                placeholder="00.0"
                className={`${s['focus-underline']}`}
                value={formValues.weight}
                onChange={onInputChangeHandler}
              />
              <em className={s.unit}>kg</em>
            </div>
          </div>
        </label>
      </div>
      <div className={s['input-row']}>
        <div className={s.input_title}>중성화 여부</div>
        <CustomRadioTrueOrFalse
          name="neutralization"
          value={formValues.neutralization}
          setValue={setFormValues}
          theme={'letter-in-shape'}
          labelList={['했습니다', '안했습니다']}
        />
      </div>
    </section>
  );
}


