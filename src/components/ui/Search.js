import React from 'react';
import styled from 'styled-components';
import {
  InputAdornment as MuiInputAdornment,
  InputBase as MuiInputBase,
} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import colors from 'lib/colors';

const BigSearch = styled(({ className, startIcon, ...props }) => (
  <MuiInputBase
    className={className}
    {...props}
    startAdornment={
      <MuiInputAdornment position="start">
        <SearchOutlinedIcon color="disabled" />
      </MuiInputAdornment>
    }
  />
))`
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.palette.common.white};
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
  border: ${(props) => (props.small ? '1px solid #eee' : 'none')};
  border-radius: 10px;
  padding: 0 20px;
  height: 46px;
  display: flex;
  flex: auto;
`;

const SmallSearch = styled(BigSearch)`
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.palette.common.white};
  box-shadow: none;
  border: 1px solid ${colors.gray500};
  height: 32px;
  padding: 0 10px;
`;

const Search = (props) => {
  return props.small ? <SmallSearch {...props} /> : <BigSearch {...props} />;
};
export default Search;
