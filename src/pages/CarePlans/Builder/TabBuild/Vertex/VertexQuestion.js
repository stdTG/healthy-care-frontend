import React from 'react';

import { ThemeProvider } from 'lib/providers';
import { questionTypes } from 'lib/enums/questionTypes';
import { SBlock } from '../styled/vertexQuestion';
import QuestionNumeric from './QuestionNumeric';
import QuestionScale from './QuestionScale';
import QuestionYesNo from './QuestionYesNo';
import QuestionRating from './QuestionRating';
import QuestionMultipleChoice from './QuestionMultipleChoice';
import { Icon, Typography } from 'components/ui';
import { useTranslation } from 'react-i18next';

function VertexQuestion(props) {
  const { geometry, type, value, title } = props;
  const { t } = useTranslation();

  const getQuestion = () => {
    switch (value?.questionType) {
      case questionTypes.numeric:
        return <QuestionNumeric {...props} />;
      case questionTypes.scale:
        return <QuestionScale {...props} />;
      case questionTypes.yesNo:
        return <QuestionYesNo {...props} />;
      case questionTypes.rating:
        return <QuestionRating {...props} />;
      case questionTypes.multipleChoice:
        return <QuestionMultipleChoice {...props} />;
      default:
        return (
          <div>
            <Typography variant="h5" gutterBottom>
              {title.icon && <Icon icon={title.icon} size="1x" mr={10} />}
              Question
            </Typography>

            <Typography
              variant="subtitle1"
              style={{ whiteSpace: ' break-spaces' }}
            >
              {value.text || t('Double click to edit')}
            </Typography>
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div style={{ position: 'relative' }}>
        <SBlock p={2} geometry={geometry}>
          {getQuestion()}
        </SBlock>
      </div>
    </ThemeProvider>
  );
}

export default VertexQuestion;
