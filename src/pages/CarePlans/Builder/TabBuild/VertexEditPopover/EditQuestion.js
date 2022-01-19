import React, { useState } from 'react';

import { questionTypes } from 'lib/enums/questionTypes';
import PopoverCalculator from './PopoverCalculator';
import PopoverSettings from './PopoverSettings';
import SelectQuestionType from './SelectQuestionType';
import QuestionMultipleChoice from './QuestionMultipleChoice';
import QuestionNumeric from './QuestionNumeric';
import QuestionRating from './QuestionRating';
import QuestionScale from './QuestionScale';
import QuestionYesNo from './QuestionYesNo';
import useDialog from 'lib/hooks/useDialog';
import { vertexTypes } from '../../../../../lib/enums/vertexTypes';

function EditQuestion(props) {
  const { initialValues, settingsPopover } = props;

  const calculatorPopover = useDialog();
  const [type, setQuestionType] = useState(initialValues?.questionType);

  const getContent = () => {
    switch (type) {
      case questionTypes.numeric:
        return (
          <QuestionNumeric
            {...props}
            type={type}
            openCalc={calculatorPopover.open}
            openSettings={settingsPopover.open}
          />
        );
      case questionTypes.scale:
        return (
          <QuestionScale
            {...props}
            type={type}
            openCalc={calculatorPopover}
            openSettings={settingsPopover.open}
          />
        );
      case questionTypes.yesNo:
        return (
          <QuestionYesNo
            {...props}
            type={type}
            openCalc={calculatorPopover}
            openSettings={settingsPopover.open}
          />
        );
      case questionTypes.rating:
        return (
          <QuestionRating
            {...props}
            type={type}
            openCalc={calculatorPopover}
            openSettings={settingsPopover.open}
          />
        );
      case questionTypes.multipleChoice:
        return (
          <QuestionMultipleChoice
            {...props}
            type={type}
            openCalc={calculatorPopover}
            openSettings={settingsPopover}
          />
        );
      default:
        return <SelectQuestionType setQuestionType={setQuestionType} />;
    }
  };

  return (
    <>
      {calculatorPopover.isOpen && (
        <PopoverCalculator
          close={calculatorPopover.close}
          isOpen={calculatorPopover.isOpen}
          initialData={calculatorPopover.initialData}
        />
      )}

      {getContent()}
    </>
  );
}

export default EditQuestion;
