import styled from 'styled-components';
import { Accordion as MuiAccordion } from '@material-ui/core';
import colors from 'lib/colors';

export const SAccordion = styled(MuiAccordion)`
  border: none;
  box-shadow: none;
  background-color: transparent;
`;

export const SEventPreview = styled('div')`
  background-color: ${(props) =>
    props.isSelected ? props.theme.palette.success.light : colors.white};
  border: 1px solid ${colors.gray500};
  border-radius: 18px;
  padding: 15px;
  box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
  margin: 0 10px 15px;
  
  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.palette.success.dark};
    transition: ${(props) =>
      props.theme.transitions.create(['border-color'], {
        easing: props.theme.transitions.easing.easeIn,
        duration: props.theme.transitions.duration.standard,
      })},
  },
`;
