import styled from 'styled-components';

const SLogoContainer = styled('div')`
  background-color: ${(props) => props.theme.palette.primary.main};
  display: inline-block;
  height: 80px;
  border-radius: 24px;
  width: 80px;
  text-align: center;
  padding-top: 20px;
`;

export default SLogoContainer;
