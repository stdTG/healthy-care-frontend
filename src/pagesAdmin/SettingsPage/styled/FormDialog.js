import styled from 'styled-components';

import FormDialog from 'components/Dialogs/FormDialog';

const StyledFormDialog = styled(FormDialog)`
  .MuiDialogTitle-root {
    .MuiTypography-root {
      width: 100%;
    }
    .closeButton {
      display: none;
    }
  }
`;

export default StyledFormDialog;
