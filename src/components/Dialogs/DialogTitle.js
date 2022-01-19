import styled from 'styled-components';
import {
  DialogTitle as MuiDialogTitle,
  IconButton as MuiIconButton,
  Typography as MuiTypography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const DialogTitle = styled((props) => {
  const {
    children,
    classes,
    onClose,
    isFormDialog,
    titleButton,
    ...other
  } = props;

  return (
    <MuiDialogTitle disableTypography {...other}>
      <div className="titleButton">{titleButton}</div>
      <MuiTypography variant="h4" align="center">
        {children}
      </MuiTypography>
      {onClose ? (
        <MuiIconButton
          size="small"
          aria-label="close"
          classes={{ root: 'closeButton' }}
          onClick={onClose}
        >
          <CloseIcon classes={{ root: 'icon' }} />
        </MuiIconButton>
      ) : null}
    </MuiDialogTitle>
  );
})`
  padding: 28px 24px 0;
  min-width: 350px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .titleButton {
    min-width: 32px;
  }
  .closeButton {
    font-size: 10px;
    color: ${(props) => props.theme.palette.grey[900]};
    border: 1px solid ${(props) => props.theme.palette.grey[200]};
    border-radius: 10px;

    height: 32px;
    width: 32px;
  }
  .icon {
    font-size: 16px;
  }
`;

export default DialogTitle;
