import React from 'react';
import { Checkboxes as RffCheckboxes } from 'mui-rff';
import {
  Typography as MuiTypography,
  Button as MuiButton,
  Box as MuiBox,
} from '@material-ui/core';
import styled from 'styled-components';

import { FormTextField, FormControl, Icon } from 'components/ui';

import FormDialog from 'components/Dialogs/FormDialog';
import { recordListWithIcons } from 'lib/enums/recordList';
import { sexData } from 'lib/enums/sex';
import { countAge } from 'lib/utils';
import SFrame from './styled/SFrame';
import { useTranslation } from 'react-i18next';

const Checkboxes = styled(({ className, ...props }) => (
  <RffCheckboxes {...props} formControlLabelProps={{ className: className }} />
))`
  svg {
    vertical-align: bottom;
  }
`;

function RecordShareDialog(props) {
  const { close, initialData, isOpen } = props;
  const { t } = useTranslation();

  if (!isOpen) return null;

  var { firstName, lastName, sex, birthday } = initialData || {};

  firstName = 'Laure';
  lastName = 'Andreas';
  birthday = '1980-07-20';
  sex = 'FEMALE';

  const onSave = (values) => {
    close({ data: values });
  };

  const actions = [
    <MuiButton key="save" type="submit" color="primary" variant="contained">
      <Icon icon="share" size="1x" mr={5} style={{ marginBottom: '1px' }} />
      {t('Share record')}
    </MuiButton>,
  ];

  return (
    <FormDialog
      title={'Share record'}
      onSubmit={onSave}
      initialValues={{}}
      // validate={}
      actions={actions}
      onClose={close}
      {...props}
    >
      {() => {
        return (
          <div>
            <SFrame p="20px 20px 30px">
              <MuiBox display="flex" p="20px 0 30px">
                <Icon icon="address-card" size="2x" />
                <MuiBox textAlign="left" ml="10px">
                  <MuiTypography variant="h5">
                    {firstName} {lastName}
                  </MuiTypography>
                  <div>
                    <Icon icon={sexData[sex].icon} size="1x" />
                    <span style={{ margin: '5px' }}>&sdot;</span>
                    {countAge(birthday)}
                  </div>
                </MuiBox>
              </MuiBox>

              <Checkboxes
                name="sharedList"
                size="small"
                color="primary"
                data={recordListWithIcons}
              />
            </SFrame>

            <MuiBox display="flex" p="0px 0 0px">
              <RffCheckboxes
                name="protectWithPassword"
                size="small"
                style={{ margin: '10px 0' }}
                data={[
                  {
                    label: t('Protect with password'),
                    value: true,
                  },
                ]}
              />
            </MuiBox>
            <FormControl>
              <FormTextField
                name="password"
                placeholder={t('Choose password')}
              />
            </FormControl>

            <MuiBox display="flex" p="0px 0 0px">
              <RffCheckboxes
                name="sharingExpires"
                size="small"
                style={{ margin: '10px 0' }}
                data={[
                  {
                    label: t('Sharing expires'),
                    value: true,
                  },
                ]}
              />
            </MuiBox>
            <FormControl>
              <FormTextField name="expiryDate" placeholder={t('dd/mm/yyyy')} />
            </FormControl>
          </div>
        );
      }}
    </FormDialog>
  );
}

export default RecordShareDialog;
