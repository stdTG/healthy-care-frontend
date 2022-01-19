import React from 'react';
import PropTypes from 'prop-types';
import { Dialog as MuiDialog } from '@material-ui/core';

import DialogTitle from './DialogTitle';
import DialogContent from './DialogContent/Index';

function Dialog(props) {
  const {
    isOpen,
    onClose,
    children,
    title,
    isFormDialog,
    titleButton,
    contentStyle,
    leftTitleButton,
    ...rest
  } = props;

  return (
    <MuiDialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={isOpen}
      {...rest}
    >
      {title && !leftTitleButton && (
        <DialogTitle
          titleButton={titleButton}
          id="simple-dialog-title"
          onClose={onClose}
        >
          {title}
        </DialogTitle>
      )}
      {isFormDialog ? children : <DialogContent>{children}</DialogContent>}
    </MuiDialog>
  );
}

Dialog.propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Dialog;
