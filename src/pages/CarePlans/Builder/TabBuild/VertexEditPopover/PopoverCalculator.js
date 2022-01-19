import React from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox, Popover as MuiPopover } from '@material-ui/core';

import { FormTextField, Typography, Space } from 'components/ui';
import FormSelect from 'components/ui/FormSelect';
import { SFormControl } from 'pages/CarePlans/Builder/TabBuild/styled/question';
import { useTranslation } from 'react-i18next';

const options = [
  {
    id: 1,
    name: 'Add',
    value: 'add',
  },
  {
    id: 2,
    name: 'Substract',
    value: 'substract',
  },
];

function PopoverCalculator(props) {
  const { id, close, isOpen, initialData } = props;
  const { t } = useTranslation();

  const onSubmit = (values) => {};
  return (
    <MuiPopover
      anchorEl={initialData.anchorEl.current}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      id={id}
      open={isOpen}
      onClose={close}
    >
      <Form
        onSubmit={onSubmit}
        initialValues={initialData}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <MuiBox m={2}>
                <Typography variant="h5" mb={4}>
                  {t('When someone answers question "var"')}
                </Typography>
                <Space display="flex" justifyContent="space-between" mb={3}>
                  <FormTextField
                    name="min"
                    type="number"
                    placeholder="If"
                    style={{ width: '100px' }}
                  />
                  <Typography variant="h6" mb={4}>
                    {t('the answer is')}
                  </Typography>
                  <SFormControl>
                    <FormSelect
                      name="smoking"
                      label=""
                      options={options}
                      getItemId={(item) => item.value}
                      getItemName={(item) => item.name}
                    />
                  </SFormControl>
                </Space>

                <Space display="flex" justifyContent="space-between" mb={1}>
                  <SFormControl label={t('Or between')}>
                    <FormSelect
                      name="smoking"
                      label=""
                      options={options}
                      getItemId={(item) => item.value}
                      getItemName={(item) => item.name}
                    />
                  </SFormControl>
                  <Typography variant="h6" mb={4}>
                    {t('and')}
                  </Typography>
                  <FormTextField
                    name="max"
                    type="number"
                    placeholder={0}
                    style={{ width: '100px' }}
                  />
                </Space>

                <Space display="flex" justifyContent="space-between" mb={3}>
                  <SFormControl label={t('Then')}>
                    <FormSelect
                      name="smoking"
                      label=""
                      options={options}
                      getItemId={(item) => item.value}
                      getItemName={(item) => item.name}
                    />
                  </SFormControl>
                  <FormTextField
                    name="max"
                    type="number"
                    placeholder={0}
                    style={{ width: '100px' }}
                  />
                </Space>
              </MuiBox>
            </form>
          );
        }}
      />
    </MuiPopover>
  );
}

export default PopoverCalculator;
