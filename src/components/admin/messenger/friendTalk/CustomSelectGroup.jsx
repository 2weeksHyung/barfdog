import React, { useEffect, useState } from 'react';
import CustomSelectForTwoSelects from '/src/components/admin/form/CustomSelectForTwoSelects';

const CustomSelectGroup = ({ setFormValues, groupOptions }) => {
  const startName = groupOptions?.startName; // string
  const endName = groupOptions?.endName; // string
  const options = groupOptions?.options || [];

  const [selectedGrade, setSelectedGrade] = useState();
  const [gradeEndList, setGradeEndList] = useState(options);

  useEffect(() => {
    const start = selectedGrade && selectedGrade[startName].selectedIdx;
    const end = options.length;
    const filteredGradeOptions = options.splice(start, end);
    setGradeEndList(filteredGradeOptions);
    setFormValues((prevState) => ({
      ...prevState,
      [startName]: { value: selectedGrade && selectedGrade[startName].value },
    }));
  }, [selectedGrade]);

  if (!groupOptions || !gradeEndList.length) return;
  // console.log(options)

  return (
    <>
      <CustomSelectForTwoSelects
        name={startName}
        id={startName}
        options={options}
        onChange={setSelectedGrade}
      />
      <span style={{ margin: '0 10px' }}>~</span>
      <CustomSelectForTwoSelects
        name={endName}
        id={endName}
        options={gradeEndList}
        onChange={setFormValues}
      />
    </>
  );
};

export default CustomSelectGroup;