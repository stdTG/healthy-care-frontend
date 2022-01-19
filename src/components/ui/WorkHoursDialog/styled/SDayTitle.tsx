import styled from 'styled-components';

const SDayTitle = styled.div<Props>`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: right;
  margin-right: 12px;

  color: ${(props) =>
  props.isActive ? 'black' : props.theme.palette.text.secondary};
`;

export default SDayTitle

interface Props {
  isActive?: boolean
}
