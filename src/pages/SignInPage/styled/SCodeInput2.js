import React, { useRef } from 'react';
import styled from 'styled-components';
import { Field } from 'react-final-form';

const SInput = styled((props) => <input maxLength={1} {...props} />)`
  height: 46px;
  width: 80px;
  background: white;
  top: 0;
  left: 0;
  margin-right: 10px;
  border-radius: 10px;
  border: none;
  padding-left: 35px;

  &:focus {
    outline: none;
  }
`;
const SCodeInput = (props) => {
  const onChange = (event) => {
    const currentIndex = document.activeElement.tabIndex;

    event.currentTarget.nextSibling && event.currentTarget.nextSibling.focus();
  };

  return (
    <Field {...props}>
      <SInput tabIndex={1} onKeyUp={onChange} />
      <SInput tabIndex={2} onKeyUp={onChange} />
      <SInput tabIndex={3} onKeyUp={onChange} />
      <SInput tabIndex={4} onKeyUp={onChange} />
      <SInput tabIndex={5} onKeyUp={onChange} />
      <SInput tabIndex={6} onKeyUp={onChange} />
    </Field>
  );
};
export default SCodeInput;
