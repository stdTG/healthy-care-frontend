import React from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';

const defaultColors = [
  {
    id: 0,
    color: '#2164E8',
  },
  {
    id: 1,
    color: '#F23A61',
  },
  {
    id: 2,
    color: '#F29D3A',
  },
  {
    id: 3,
    color: '#F29D3A',
  },
];

const LinearProgress = (props) => {
  const { data, getItemValue, colors } = props;

  const getDataInPercent = () => {
    const summ = data.reduce((acc, curr) => {
      return acc + getItemValue(curr);
    }, 0);

    return data.map((item, index) => {
      let colorToReturn = defaultColors[index].color;
      if (colors) {
        colorToReturn = colors[index].color;
      }

      return {
        id: index,
        percent: (getItemValue(item) * 100) / summ,
        color: colorToReturn,
      };
    });
  };

  const addZindex = (arr) => {
    let currentPercent = arr[0]?.percent || 0;

    return arr?.map((item, index) => {
      if (index === 0) {
        return {
          ...item,
          percent: currentPercent,
          zIndex: 1,
        };
      }

      if (index <= arr?.length) {
        const currentItem = {
          ...item,
          percent: currentPercent + item?.percent,
          zIndex: 1 - index,
        };

        currentPercent = currentPercent + item?.percent;

        return currentItem;
      }
    });
  };

  return (
    <SContainer>
      {addZindex(getDataInPercent()).map((progress) => {
        return (
          <SProgressWrap key={progress.id} zIndex={progress.zIndex}>
            <Progress
              percent={progress.percent}
              strokeColor={progress.color}
              trailColor="transparent"
              strokeWidth="15px"
              showInfo={false}
            />
          </SProgressWrap>
        );
      })}
    </SContainer>
  );
};

export default LinearProgress;

const SContainer = styled.div`
  position: relative;
`;

const SProgressWrap = styled.div`
  width: 100%;
  position: absolute;
  z-index: ${(props) => props.zIndex};
`;
