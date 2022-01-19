import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, Icon } from 'components/ui';
import { Form } from 'react-final-form';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
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
    minWidth: 400,
    border: 'none',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
}))(MuiDialogActions);

const genderIdentityOptions = [
  'Female-to-Male (FTM), Transgender Male, Trans Man',
  'Female-to-Male (MTF), Transgender Female, Trans Woman',
  'Non-conforming gender, genderqueer, neither exclusively male nor female, non-binary gender',
  'Additional gender category or other',
  'Choose note to disclose',
];
const sexualOrientationOptions = [
  'Lesbian, gay or homosexual',
  'Straight or heterosexual',
  'Bisexual',
  'Something else',
  "Don't know",
  'Choose not to disclose',
];
const educationalLevelOptions = [
  'None',
  'Early Childhood Education',
  'Primary Education',
  'Lower Secondary Education',
  'Upper Secondary Education',
  'Short Cycle Tertiary Education',
  "Bachelor's or Equivalent Level",
  "Master's or Equivalent Level",
  'Doctorat or Equivalent Level',
];
const maritalStatusOptions = [
  'Never married',
  'Widowed',
  'Divorced',
  'Separated',
  'Married(registered and de facto)',
  'Not stated/inadequately described',
];
const housingStatusOptions = [
  'Lives with partner/spouse/family/friends',
  'Lives alone',
  'Lives in a nursing home, hospital or other long term care home',
  'Other',
];
const lonelinessOptions = [
  'See or talk to people close to less than once a week',
  'See or talk to people close to 1 or 2 times a week',
  'See or talk to people close to 3 to 5 times a week',
  'See or talk to people close to 5 or more times a week',
  'Chooses not to answer the question',
];
const transportationOptions = [
  'Lack of access for daily living, work, meetings',
  'Lack of Access for medical appointments',
  'No lack of access',
  'Chooses not to answer the question',
];
const safetyOptions = [
  'Feel physically and emotionally unsafe',
  'Do not feel physically and emotionally unsafe',
  'Unsure to feel physically and emotionally unsafe',
  'Chooses not to answer the question',
];
const violenceOptions = [
  'Afraid of partner or ex-partner in the past year',
  'Not afraid of partner or ex-partner in the past year',
  'Unsure to be afraid of partner or ex-partner in the past year',
  'Chooses not to answer the question',
];
const financeOptions = [
  'Real monthly financial difficulties in meeting needs (food, rent, electricity, ...)',
  'No difficulty',
  'Chooses not to answer the question',
];

function Select({ name, options, label, placeholder }) {
  return (
    <RffAutocomplete
      label=""
      name={name}
      variant="outlined"
      options={options}
      getOptionValue={(option) => option}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <FormControl label={label} fullWidth>
          <Input {...params} placeholder={placeholder} variant="outlined" />
        </FormControl>
      )}
    />
  );
}

export default function SocialDeterminantModal({ open, onClose }) {
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
            <Icon icon="walking" size="1x" mr={10} />
            {t('Social Determinants')}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Form
            onSubmit={() => {}}
            initialValues={{}}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Select
                  name="genderIdentity"
                  options={genderIdentityOptions}
                  label={t('Gender Identity')}
                  placeholder={t('Select the gender identity')}
                />
                <Select
                  name="sexualOrientation"
                  options={sexualOrientationOptions}
                  label={t('Sexual Orientation')}
                  placeholder={t('Select the sexual orientation')}
                />
                <Select
                  name="educationalLevel"
                  options={educationalLevelOptions}
                  label={t('Educational Level')}
                  placeholder={t('Select the educational level')}
                />
                <Select
                  name="maritalStatus"
                  options={maritalStatusOptions}
                  label={t('Marital Status')}
                  placeholder={t('Select the marital status')}
                />
                <Select
                  name="housingStatus"
                  options={housingStatusOptions}
                  label={t('Housing Status')}
                  placeholder={t('Select the housing status')}
                />
                <Select
                  name="loneliness"
                  options={lonelinessOptions}
                  label={t('Loneliness')}
                  placeholder={t('Select the loneliness')}
                />
                <Select
                  name="transportation"
                  options={transportationOptions}
                  label={t('Transportation access')}
                  placeholder={t('Select the transportation access')}
                />
                <Select
                  name="safety"
                  options={safetyOptions}
                  label={t('Safety at place of live')}
                  placeholder={t('Select the safety at place of live')}
                />
                <Select
                  name="violence"
                  options={violenceOptions}
                  label={t('Violence')}
                  placeholder={t('Select the violence')}
                />
                <Select
                  name="finance"
                  options={financeOptions}
                  label={t('Finance')}
                  placeholder={t('Select the finance')}
                />
              </form>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
          >
            <Icon icon="check" mr={10} />
            {t('Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
