import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FormTextField, FormControl, Input, Icon } from 'components/ui';
import { Form } from 'react-final-form';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { useTranslation } from 'react-i18next';
import {
  actions as patientRecordActions,
  selectors as patientRecordSelectors,
} from 'services/patientRecord';
import { useAdd_AllergyMutation } from './../../generated/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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

const categories = [
  'Food',
  'Medication',
  'Environment',
  'Organism',
  'Animal',
  'No unknown allergy',
];

const foodSubstance = ['Acetylcysteine', 'Almond oil', 'Arachis oil', 'Barley'];
const medicationSubstance = [
  '3-hydroxy-3-methylglutaryl-coenzyme A reductase inhibitor',
  '5-hydroxytryptamine-3-receptor antagonist',
  'acarbose',
  'acenocoumarol',
  'acetazolamide',
];
const environmentSubstance = ['House dust', 'Wood dust'];
const organismSubstance = [
  'Anaerobbic bacteria',
  'Capnophilic bacteria',
  'Cocci (organism)',
  'Coccobacilli (organism)',
];
const animalSubstance = ['Cat', 'Dog', 'Guinea pig', 'Horse'];

function getSubstanceList(category) {
  switch (category) {
    case 'Food':
      return foodSubstance;
    case 'Medication':
      return medicationSubstance;
    case 'Environment':
      return environmentSubstance;
    case 'Organism':
      return organismSubstance;
    case 'Animal':
      return animalSubstance;
    default:
      return [];
  }
}

const reactionRisks = ['Rashes', 'No manifestation known'];
const severities = ['Mild', 'Moderate', 'Severe', 'Life threatening'];
const certainties = ['Unlikely', 'Likely', 'Certain', 'Confirmed'];

export default function AllergiesModal({ open, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  var [selectedAllergyCategory, setSelectedAllergyCategory] = useState('Food');

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
        onChange={(event, newValue) => {
          console.log(newValue);
          if (categories.includes(newValue)) {
            setSelectedAllergyCategory(newValue);
          }
        }}
      />
    );
  }

  const [addAllergy, { loading }] = useAdd_AllergyMutation();
  const { id } = useParams();

  const onAdd = async (values) => {
    const response = await addAllergy({
      variables: {
        patient: id,
        record: {
          ...values,
        },
      },
    });

    if (response?.data?.user?.patientUser?.allergy?.add?.ok) {
      dispatch(
        patientRecordActions.setAllergies({
          allergies: response?.data?.user?.patientUser?.allergy?.add?.result,
        })
      );
    }
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
            <Icon icon="head-side-cough" size="1x" mr={10} />
            {t('Allergy')}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Form
            onSubmit={onAdd}
            initialValues={{}}
            render={({ values, handleSubmit, invalid }) => (
              <form>
                <Select
                  name="category"
                  options={categories}
                  label={t('Category')}
                  placeholder={t('Select the category of allergy intolerance')}
                />
                <Select
                  name="substance"
                  options={getSubstanceList(selectedAllergyCategory)}
                  label={t('Substance')}
                  placeholder={t('Select the substance')}
                />
                <Select
                  name="reactionTask"
                  options={reactionRisks}
                  label={t('Reaction task')}
                  placeholder={t('Select the type of reaction task')}
                />
                <Select
                  name="severity"
                  options={severities}
                  label={t('Severity')}
                  placeholder={t('Select the severity')}
                />
                <Select
                  name="certainty"
                  options={certainties}
                  label={t('Certainty')}
                  placeholder={t('Select the certainty')}
                />
                <FormControl label={t('Comment')}>
                  <FormTextField name="comment" multiline rows={4} />
                </FormControl>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    <Icon icon="check" mr={10} />
                    {t('Save')}
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
