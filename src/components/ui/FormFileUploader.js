import React, { useState } from 'react';
import styled from 'styled-components';
import colors from 'lib/colors';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

const FormFileUploader = ({ name, withTitle, style }) => {
  const [fileName, setFileName] = useState('');
  const { t } = useTranslation();

  return (
    <>
      <Field name={name}>
        {({ input, meta }) => {
          return (
            <SInputLabel style={style}>
              {fileName || (
                <span style={{ color: '#9797a7' }}>
                  {withTitle && t('Choose file')}
                </span>
              )}
              <SInputWrapper>
                <input
                  type="file"
                  onChange={(e) => {
                    input.onChange(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }}
                />
              </SInputWrapper>
            </SInputLabel>
          );
        }}
      </Field>
    </>
  );
};

export default FormFileUploader;

const SInputLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 14px;
  border-radius: 10px;
  height: 32px;
  border: ${`1px solid ${colors.gray500}`};
  font-weight: 600;

  :hover {
    cursor: pointer;
    border-color: black;
  }
`;
const SInputWrapper = styled.div`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;
