import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components';
import useDebounce from '../../lib/hooks/useDebounce';
import colors from 'lib/colors';

const AppSlider: FC<Props> = ({ onChangeCommitted, initialValues }) => {

  const [currentValue, setCurrentValue] = useState(initialValues);

  useEffect(()=>{
    setCurrentValue(initialValues)
  },[initialValues])

  const debounceChange = useDebounce((value: number) => onChangeCommitted(value), 200);

  const handleChangeCommitted = (event: ChangeEvent<{}>, currentValue: [number, number]) => {
    debounceChange(currentValue);
  };
  const handleChange = (event: ChangeEvent<{}>, currentValue: [number, number]) => {
    setCurrentValue(currentValue);
  };

  return (
    <SliderWrap>
      <Slider
        value={currentValue}
        onChangeCommitted={handleChangeCommitted as any}
        onChange={handleChange as any}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </SliderWrap>
  );
};

export default AppSlider;

const SliderWrap = styled.div`
  .MuiSlider-root {
    color: #b7b7bb;
  }
  .MuiSlider-track {
    height: 6px;
    background-color: ${colors.orange100};
  }
  .MuiSlider-thumb {
    background-color: white;
    width: 20px;
    height: 20px;
    margin-top: -7px;
    box-shadow: 0px 0px 0px 3px rgba(166, 166, 166, 0.11);
  }
  .MuiSlider-thumb:hover {
    box-shadow: 0px 0px 0px 8px rgba(166, 166, 166, 0.16);
  }
  .MuiSlider-valueLabel {
    color: ${colors.orange100};
    left: -7px;
  }
`;

interface Props {
  initialValues: [number, number]
  onChangeCommitted: (value: any) => void
}
