import React from 'react';
import { questionTypes } from 'lib/enums/questionTypes';
import { vertexTypes, vertexTypesData } from 'lib/enums/vertexTypes';
import QuestionScale from 'pages/CarePlans/Builder/TabBuild/Vertex/QuestionScale';
import QuestionRating from 'pages/CarePlans/Builder/TabBuild/Vertex/QuestionRating';
import QuestionNumeric from 'pages/CarePlans/Builder/TabBuild/Vertex/QuestionNumeric';
import QuestionYesNo from 'pages/CarePlans/Builder/TabBuild/Vertex/QuestionYesNo';
import QuestionMultipleChoice from 'pages/CarePlans/Builder/TabBuild/Vertex/QuestionMultipleChoice';

const Question = ({ value }) => {
  const renderContent = () => {
    switch (value.questionType) {
      case questionTypes.numeric:
        return (
          <QuestionNumeric
            title={{ icon: vertexTypesData[vertexTypes.question].icon }}
            value={value}
          />
        );
      case questionTypes.scale:
        return (
          <QuestionScale
            title={{ icon: vertexTypesData[vertexTypes.question].icon }}
            value={value}
          />
        );
      case questionTypes.rating:
        return (
          <QuestionRating
            title={{ icon: vertexTypesData[vertexTypes.question].icon }}
            value={value}
          />
        );
      case questionTypes.yesNo:
        return (
          <QuestionYesNo
            title={{ icon: vertexTypesData[vertexTypes.question].icon }}
            value={{ ...value, children: [] }}
          />
        );
      case questionTypes.multipleChoice:
        return (
          <QuestionMultipleChoice
            title={{ icon: vertexTypesData[vertexTypes.question].icon }}
            value={value}
          />
        );
      default:
        return <div />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Question;
