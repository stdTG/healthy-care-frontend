import React from 'react';
import { values } from 'ramda';

import { Icon, Typography } from 'components/ui';
import { questionTypesData } from 'lib/enums/questionTypes';
import { useTranslation } from 'react-i18next';

function QuestionYesNo(props) {
  const { title, value } = props;
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <Icon icon={title.icon} size="1x" mr={10} />
        {t('Question')}: {questionTypesData[value.questionType].text}
      </Typography>

      <Typography variant="subtitle1">
        {value.text || t('Double click to edit')}
      </Typography>

      {!value.isChildrenShown &&
        values(value.children).map((item, index) => {
          return (
            <Typography variant="subtitle1">
              {t('Answer')} {index + 1}: {item.value.text}
            </Typography>
          );
        })}
    </div>
  );
}

export default QuestionYesNo;
