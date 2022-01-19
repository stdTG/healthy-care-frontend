import React from 'react';

import { Icon, Typography } from 'components/ui';
import { questionTypesData } from 'lib/enums/questionTypes';
import { useTranslation } from 'react-i18next';

function QuestionNumeric(props) {
  const { title, value } = props;
  const { t } = useTranslation();

  const options = {
    1: { type: '1', text: 'Kilo - kg' },
    2: { type: '2', text: 'Meters - m' },
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <Icon icon={title.icon} size="1x" mr={10} />
        {t('Question')}: {questionTypesData[value.questionType].text}
      </Typography>

      <Typography variant="subtitle1">
        {value.text || t('Double click to edit')}
      </Typography>

      <Typography variant="subtitle1">
        {t('Min')}: {value.min}
      </Typography>
      <Typography variant="subtitle1">
        {t('Max')}: {value.max}
      </Typography>
      {value.prefix && (
        <Typography variant="subtitle1">
          {t('Prefix')}: {options[value.prefix].text}
        </Typography>
      )}
    </div>
  );
}

export default QuestionNumeric;
