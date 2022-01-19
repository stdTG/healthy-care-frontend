import React from 'react';
import { Icon, Typography } from 'components/ui';
import { questionTypesData } from 'lib/enums/questionTypes';
import { useTranslation } from 'react-i18next';

function QuestionScale(props) {
  const { title, value } = props;
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <Icon icon={title.icon} size="1x" mr={10} />
        {t('Question')}: {questionTypesData[value.questionType].text}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {value.text || t('Double click to edit')}
      </Typography>

      <Typography variant="subtitle1">
        <b>{t('Start scale')}:</b> {value.startScale}
      </Typography>
      <Typography variant="subtitle1">
        <b>{t('End scale')}:</b> {value.endScale}
      </Typography>
      <Typography variant="subtitle1">
        <b>{t('Left label')}:</b> {value.leftLabel}
      </Typography>
      <Typography variant="subtitle1">
        <b>{t('Center label')}:</b> {value.centerLabel}
      </Typography>
      <Typography variant="subtitle1">
        <b>{t('Right label')}:</b> {value.rightLabel}
      </Typography>
    </div>
  );
}

export default QuestionScale;
