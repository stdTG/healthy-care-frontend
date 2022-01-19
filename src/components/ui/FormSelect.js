import React from 'react';
import PropTypes from 'prop-types';
import { convertToTitleCase } from 'lib/utils';
import { Field } from 'react-final-form';
import { Select as RffSelect } from 'mui-rff';
import { MenuItem as MuiMenuItem } from '@material-ui/core';

const FormSelect = (props) => {
  const { name, options, getItemId, getItemName } = props;
  return (
    <Field>
      {({ input, meta }) => {
        return (
          <RffSelect
            {...props}
            variant="outlined"
            size="small"
            name={name}
            style={{ height: '32px', width: '100%' }}
          >
            {options?.map((item) => (
              <MuiMenuItem key={getItemId(item)} value={getItemId(item)}>
                {convertToTitleCase(getItemName(item))}
              </MuiMenuItem>
            ))}
          </RffSelect>
        );
      }}
    </Field>
  );
};

export default FormSelect;

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getItemId: PropTypes.func.isRequired,
  getItemName: PropTypes.func.isRequired,
};
