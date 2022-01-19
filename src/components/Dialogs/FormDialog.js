import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import Dialog from './index';
import { DialogActions } from 'components';
import DialogContent from '../Dialogs/DialogContent/Index';

export function FormDialog(props) {
  const {
    children,
    actions,
    initialValues,
    validate,
    onSubmit,
    contentStyle,
    onClose,
  } = props;

  return (
    <Dialog {...props} onClose={onClose} isFormDialog={true}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={(form) => (
          <form onSubmit={form.handleSubmit} noValidate>
            <DialogContent style={contentStyle}>
              {children && children(form.values, form)}
            </DialogContent>
            <DialogActions>{actions}</DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
}

FormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default FormDialog;
