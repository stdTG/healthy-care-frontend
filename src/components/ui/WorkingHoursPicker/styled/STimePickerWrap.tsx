import styled from 'styled-components';
import colors from 'lib/colors';

const STimePickerWrap = styled.div<Partial<Props>>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 12px;
  padding: ${(props) => props.padding};
  width: 270px;
  border-left: 1px solid ${colors.gray100};
  color: ${colors.gray100};
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`;

export default STimePickerWrap

interface Props {
  padding: string
}
