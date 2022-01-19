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

import {
  actions as patientRecordActions,
  selectors as patientRecordSelectors,
} from 'services/patientRecord';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAdd_LifestyleMutation } from './../../generated/graphql';

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

const healthRatingOptions = ['Excellent', 'Very good', 'Good', 'Fair', 'Poor'];
const sleepHealthOptions = ['Less than 6 hours', 'Between 6 and 8 hours'];
const fitnessOptions = [
  'Never married',
  'Widowed',
  'Divorced',
  'Separated',
  'Married(registered and de facto)',
  'Not stated/inadequately described',
];

const smokingOptions = [
  'Never smoked',
  'Active smoker',
  'Passive smoker',
  'Stop smoking',
  'Married(registered and de facto)',
  'Not stated/inadequately described',
];
const drinkingOptions = [
  'Do not drink',
  'Widowed',
  'Divorced',
  'Separated',
  'Married(registered and de facto)',
  'Not stated/inadequately described',
];
const nutritionOptions = [
  'Never married',
  'Widowed',
  'Divorced',
  'Separated',
  'Married(registered and de facto)',
  'Not stated/inadequately described',
];

const drugOptions = [
  'Never married',
  'Widowed',
  'Divorced',
  'Separated',
  'Married(registered and de facto)',
  'Not stated/inadequately described',
];
const dietOptions = [
  'Omnivore',
  'Vegetarian',
  'Vegan',
  'Flexitarian',
  'Gluten free',
  'Lactose free',
  'Halal',
  'Kosher',
  'Add a diet',
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

export default function LifestyleModal({ open, onClose }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [addLifestyle, { loading }] = useAdd_LifestyleMutation();

  const onAdd = async (values) => {
    const response = await addLifestyle({
      variables: {
        patient: id,
        record: {
          ...values,
        },
      },
    });
  };

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
            {t('Lifestyle')}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Form
            onSubmit={onAdd}
            initialValues={{}}
            render={({ values, handleSubmit, invalid }) => (
              <form>
                <Select
                  name="healthRating"
                  options={healthRatingOptions}
                  label={t('Health Rating')}
                  placeholder={t('Select the health rating')}
                />
                <Select
                  name="sleepHealth"
                  options={sleepHealthOptions}
                  label={t('Sleep Health')}
                  placeholder={t('Select the sleep health')}
                />
                <Select
                  name="fitness"
                  options={fitnessOptions}
                  label={t('Fitness')}
                  placeholder={t('Select the fitness')}
                />
                <Select
                  name="smoking"
                  options={smokingOptions}
                  label={t('Smoking')}
                  placeholder={t('Select the smoking')}
                />
                <Select
                  name="drinking"
                  options={drinkingOptions}
                  label={t('Drinking')}
                  placeholder={t('Select the drinking')}
                />
                <Select
                  name="nutrition"
                  options={nutritionOptions}
                  label={t('Nutrition')}
                  placeholder={t('Select the nutrition')}
                />
                <Select
                  name="drug"
                  options={drugOptions}
                  label={t('Drug')}
                  placeholder={t('Select the drug')}
                />
                <Select
                  name="diet"
                  options={dietOptions}
                  label={t('Diet')}
                  placeholder={t('Select the diet')}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="small"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <Icon icon="check" mr={10} />
                  {t('Save')}
                </Button>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
