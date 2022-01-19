import React, { useState } from 'react';
import { values } from 'ramda';
import { Autocomplete } from '@material-ui/lab';
import { Box as MuiBox } from '@material-ui/core';

import { Button } from 'components';
import { FormControl, Icon, Input, Typography } from 'components/ui';
import { questionTypesData } from 'lib/enums/questionTypes';
import { useTranslation } from 'react-i18next';

function SelectQuestionType(props) {
  const { setQuestionType } = props;
  const [type, setType] = useState();
  const { t } = useTranslation();

  const onSelect = () => {
    setQuestionType(type);
  };

  return (
    <MuiBox m={2} display="flex" flexDirection="column" width="350px">
      <Typography variant="h5" mb={4}>
        <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
        {t('Question setting')}
      </Typography>
      <Typography>Type</Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ width: '300px' }}
      >
        {t('Select type of question')}
      </Typography>

      <Autocomplete
        onChange={(event, value) => {
          setType(value && value.type);
        }}
        label=""
        name="questionType"
        variant="outlined"
        options={values(questionTypesData)}
        getOptionValue={(option) => option.type}
        getOptionLabel={(option) => option.text}
        renderInput={(params) => (
          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <Input
              {...params}
              placeholder={t('Question type')}
              variant="outlined"
            />
          </FormControl>
        )}
      />
      <Button
        onClick={onSelect}
        title={t('Select')}
        style={{ alignSelf: 'center' }}
      />
    </MuiBox>
  );
}

export default SelectQuestionType;
