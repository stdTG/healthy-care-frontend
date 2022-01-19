import React, { useState, memo } from 'react';
import { append } from 'ramda';
import { format } from 'date-fns';
import { Form } from 'react-final-form';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import {
  Typography as MuiTypography,
  MenuItem as MuiMenuItem,
  Box as MuiBox,
} from '@material-ui/core';

import {
  FormControl,
  DatePicker,
  IconButton,
  Icon,
  Input,
} from 'components/ui';
import Card from './Card';
import AddButton from 'components/Buttons/AddButton';
import SDropdownInput from './styled/SDropdownInput';
import { useTranslation } from 'react-i18next';

const CardMedication = memo(function CardMedication(props) {
  const [isEditMode, setEditMode] = useState(false);
  const [medications, setMedications] = useState([]);
  const { t } = useTranslation();

  const getTitleIcon = (props) => <Icon icon="copy" {...props} />;
  const onEdit = () => {
    setEditMode(!isEditMode);
  };

  const onAdd = (values) => {
    setMedications(append(values, medications));
  };

  const menu = ['weeks', 'days'].map((item, index) => (
    <MuiMenuItem key={index} value={item}>
      {item}
    </MuiMenuItem>
  ));

  return (
    <Card
      title={t('Medication')}
      getTitleIcon={getTitleIcon}
      EditButton={
        <IconButton icon={isEditMode ? 'check' : 'pen'} onClick={onEdit} />
      }
    >
      {isEditMode && (
        <Form
          onSubmit={onAdd}
          initialValues={{
            medicine: null,
            startDate: new Date(),
            duration: '',
            durationType: '',
          }}
          render={({ values, handleSubmit, invalid }) => {
            return (
              <form>
                <MuiBox mb={2}>
                  <MuiTypography variant="h5">
                    {t('Add a medication')}
                  </MuiTypography>
                </MuiBox>
                <RffAutocomplete
                  label=""
                  name="metric"
                  variant="outlined"
                  options={[]}
                  getOptionValue={(option) => option.code}
                  getOptionLabel={(option) => option.name.name}
                  renderInput={(params) => (
                    <FormControl fullWidth style={{ marginBottom: '15px' }}>
                      <Input
                        {...params}
                        placeholder={`${t('Search medicine')}...`}
                        variant="outlined"
                      />
                    </FormControl>
                  )}
                />
                <FormControl>
                  <DatePicker
                    name="startDate"
                    id="date-picker-dialog"
                    placeholder={t('Started on')}
                    format="dd/MM/yyyy"
                    openTo="year"
                    variant="inline"
                    disableFuture={true}
                    KeyboardButtonProps={{
                      'aria-label': 'change date of start',
                    }}
                    inputVariant="outlined"
                  />
                </FormControl>
                <FormControl style={{ display: 'flex', flexDirection: 'row' }}>
                  <SDropdownInput
                    menu={menu}
                    name="duration"
                    menuName="durationType"
                    placeholder={`${t('For')}...`}
                  />
                </FormControl>

                <MuiBox display="flex" justifyContent="flex-end">
                  <AddButton
                    onClick={handleSubmit}
                    disabled={invalid}
                    title={t('Add medication')}
                    type="submit"
                  />
                </MuiBox>
              </form>
            );
          }}
        />
      )}

      {medications.length === 0 ? (
        <MuiTypography variant="h5" color="textSecondary">
          {t('No medications')}
        </MuiTypography>
      ) : (
        medications.map((item) => (
          <MuiBox key={item.id}>
            <MuiBox
              justifyContent="space-between"
              alignItems="center"
              display="flex"
              my={2}
            >
              <MuiBox>
                <MuiTypography variant="h5">{item.medicine}</MuiTypography>
                <MuiTypography variant="subtitle1" color="textSecondary">
                  From {format(item.startDate, 'MMM do yyyy')}
                </MuiTypography>
                <MuiTypography variant="subtitle1" color="textSecondary">
                  For {item.duration} {item.durationType}
                </MuiTypography>
              </MuiBox>

              {isEditMode && (
                <IconButton
                  icon="trash-alt"
                  color="warning"
                  onClick={() => {}}
                />
              )}
            </MuiBox>
          </MuiBox>
        ))
      )}
    </Card>
  );
});

export default CardMedication;
