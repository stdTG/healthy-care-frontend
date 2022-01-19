import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {
  FormTextField,
  FormControl,
  DatePicker,
  Input,
  Icon,
} from 'components/ui';
import {
  Grid as MuiGrid,
  MenuItem as MuiMenuItem,
  Box,
} from '@material-ui/core';
import { Form } from 'react-final-form';
import { map, pipe, toPairs, values } from 'ramda';
import { Select as RffSelect, Autocomplete as RffAutocomplete } from 'mui-rff';
import { sexData } from 'lib/enums/sex';
import { countries, languagesAll } from 'countries-list';
import PhoneInput from 'react-phone-input-2';
import Upload from '../PatientRecordPage/components/UploadFile';
import { speciality } from 'lib/enums/speciality';
import FormSelect from 'components/ui/FormSelect';
import { useTranslation } from 'react-i18next';

const styles = (theme) => ({
  root: {
    margin: 0,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    border: 'none',
  },
}))(MuiDialogContent);

export default function ProfileEditModal({
  open,
  onClose,
  initialValues,
  onSubmit,
}) {
  const languagesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(languagesAll);

  const countriesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(countries);

  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          <Typography variant="h4">
            <Icon icon="user-circle" size="1x" mr={10} />
            {t('Edit your profile')}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <MuiGrid container spacing={3}>
                  <MuiGrid item xs={6}>
                    <FormControl label={t('First name')}>
                      <FormTextField name="firstName" />
                    </FormControl>

                    <FormControl label={t('Last name')}>
                      <FormTextField name="lastName" />
                    </FormControl>
                  </MuiGrid>
                  <MuiGrid item xs={6}>
                    <Box
                      display="flex"
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Upload />
                    </Box>
                  </MuiGrid>
                </MuiGrid>
                <MuiGrid container spacing={3}>
                  <MuiGrid item xs={6}>
                    <FormControl label="Sex">
                      <RffSelect
                        variant="outlined"
                        size="small"
                        name="sex"
                        style={{ height: '32px' }}
                      >
                        {values(sexData).map((item, index) => (
                          <MuiMenuItem key={index} value={item.value}>
                            {item.label}
                          </MuiMenuItem>
                        ))}
                      </RffSelect>
                    </FormControl>
                  </MuiGrid>
                  <MuiGrid item xs={6}>
                    <Typography>{t('Date of birth')}</Typography>
                    <DatePicker
                      name="birthDate"
                      id="date-picker-dialog"
                      placeholder="dd/mm/yyyy"
                      format="dd/MM/yyyy"
                      openTo="year"
                      variant="inline"
                      disableFuture={true}
                      KeyboardButtonProps={{
                        'aria-label': 'change date of birth',
                      }}
                      inputVariant="outlined"
                    />
                  </MuiGrid>
                </MuiGrid>
                <MuiGrid container spacing={3}>
                  <MuiGrid item xs={6}>
                    <FormControl label={t('Speciality')}>
                      <FormSelect
                        name="speciality"
                        options={speciality}
                        getItemId={(item) => item.value}
                        getItemName={(item) => item.name}
                      />
                    </FormControl>
                  </MuiGrid>
                  <MuiGrid item xs={6}>
                    <FormControl label={t('Email')}>
                      <FormTextField name="email" />
                    </FormControl>
                  </MuiGrid>
                </MuiGrid>
                <MuiGrid container spacing={3}>
                  <MuiGrid item xs={6}>
                    <RffAutocomplete
                      label=""
                      name="language"
                      variant="outlined"
                      options={languagesArr}
                      getOptionValue={(option) => option.code}
                      getOptionLabel={(option) => option.name.name}
                      renderInput={(params) => (
                        <FormControl label={t('Preferred language')} fullWidth>
                          <Input
                            {...params}
                            placeholder={t('Type')}
                            variant="outlined"
                          />
                        </FormControl>
                      )}
                    />
                  </MuiGrid>
                  <MuiGrid item xs={6}>
                    <FormControl label={t('Phone number')}>
                      <PhoneInput
                        country={'fr'}
                        name="phone"
                        inputStyle={{
                          width: '100%',
                          height: 32,
                          borderRadius: 10,
                        }}
                        buttonStyle={{
                          background: 'white',
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                          borderRight: 'none',
                        }}
                      />
                    </FormControl>
                  </MuiGrid>
                </MuiGrid>
                <MuiGrid container spacing={3}>
                  <MuiGrid item xs={12}>
                    <FormControl label={t('Address')}>
                      <MuiGrid container spacing={3}>
                        <MuiGrid item xs={12}>
                          <FormTextField
                            name="fullAddress.address"
                            placeholder={t('Street')}
                            mb={20}
                          />
                        </MuiGrid>
                      </MuiGrid>
                      <MuiGrid container spacing={3}>
                        <MuiGrid item xs={6}>
                          <FormControl label={t('City')}>
                            <FormTextField
                              name="fullAddress.city"
                              placeholder={t('City')}
                              mb={20}
                            />
                          </FormControl>
                        </MuiGrid>
                        <MuiGrid item xs={6}>
                          <FormControl label={t('State')}>
                            <FormTextField
                              name="fullAddress.state"
                              placeholder={t('State')}
                              mb={20}
                            />
                          </FormControl>
                        </MuiGrid>
                      </MuiGrid>
                      <MuiGrid container spacing={3}>
                        <MuiGrid item xs={6}>
                          <FormControl label={t('Zip code')}>
                            <FormTextField
                              name="fullAddress.zipcode"
                              placeholder={t('Postcode')}
                              mb={5}
                            />
                          </FormControl>
                        </MuiGrid>
                        <MuiGrid item xs={6}>
                          <RffAutocomplete
                            label=""
                            name="fullAddress.country"
                            variant="outlined"
                            options={countriesArr}
                            getOptionValue={(option) => option.code}
                            getOptionLabel={(option) => option.name.name}
                            renderInput={(params) => (
                              <FormControl
                                label={t('Country')}
                                fullWidth
                                style={{ marginBottom: '15px' }}
                              >
                                <Input
                                  {...params}
                                  placeholder={t('Type country name')}
                                  variant="outlined"
                                />
                              </FormControl>
                            )}
                          />
                        </MuiGrid>
                      </MuiGrid>
                    </FormControl>
                  </MuiGrid>
                </MuiGrid>
                <MuiGrid container spacing={3}>
                  <MuiGrid item xs={12}>
                    <FormControl label={t('Description')}>
                      <FormTextField
                        name="description"
                        placeholder={t('Description')}
                        rows={3}
                        multiline
                      />
                    </FormControl>
                  </MuiGrid>
                </MuiGrid>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                  >
                    <Icon icon="check" mr={10} />
                    {t('Confirm')}
                  </Button>
                </Box>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
