import React from 'react';

import { Typography } from 'components/ui';
import styled from 'styled-components';
import colors from 'lib/colors';

function AutocompleteOption(props, value) {
  const { name } = props;

  return (
    <SItem>
      <SItemInfoWrap>
        <Typography
          variant="h5"
          style={{
            color: value.selected ? colors.white : colors.black,
          }}
        >
          {name}
        </Typography>
      </SItemInfoWrap>
    </SItem>
  );
}

export default AutocompleteOption;

const SItemInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const SItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;
