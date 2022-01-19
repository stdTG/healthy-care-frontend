import { DialogContent as MuiDialogContent } from '@material-ui/core';
import styled from 'styled-components';

const DialogContent = styled(MuiDialogContent)<Partial<Props>>`
  padding: ${(props) => props.padding || '24px'};
  width: ${(props) => props.width || '100%'};
  ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
`;

export default DialogContent;

interface Props {
  padding: string
  width: string
  maxWidth: string
}
