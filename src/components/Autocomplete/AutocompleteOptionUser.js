import React from 'react';
import { Avatar, Icon, Typography } from 'components/ui';
import styled from 'styled-components';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';
import { SEX, getSexDate } from 'lib/enums/sex';
import { countAge } from 'lib/utils';
import colors from 'lib/colors';
import { fade } from '@material-ui/core/styles';

function AutocompleteOptionUser(props, value) {
  const { firstName, lastName, sex, birthDate } = props;

  return (
    <SItem>
      <Avatar />
      <SItemInfoWrap>
        <Typography
          variant="h5"
          style={{
            color: value.selected ? colors.white : colors.black,
          }}
        >
          {firstName} {lastName}
        </Typography>

        {birthDate && (
          <MuiBox display="flex" alignItems="baseline">
            {sex !== SEX.undefined && (
              <>
                <Icon
                  icon={getSexDate(sex).icon}
                  size="1x"
                  style={{
                    color: value.selected
                      ? fade(colors.white, 0.5)
                      : colors.gray100,
                  }}
                />
                <Dot light={value.selected} />
              </>
            )}

            <MuiTypography
              variant="subtitle1"
              style={{
                color: value.selected
                  ? fade(colors.white, 0.5)
                  : colors.gray100,
              }}
            >
              {countAge(birthDate)}
            </MuiTypography>
          </MuiBox>
        )}
      </SItemInfoWrap>
    </SItem>
  );
}

export default AutocompleteOptionUser;

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

const Dot = styled((props) => <span {...props}>&sdot;</span>)`
  margin: 5px;
  color: ${(props) => (props.light ? fade(colors.white, 0.5) : colors.gray100)};
`;
