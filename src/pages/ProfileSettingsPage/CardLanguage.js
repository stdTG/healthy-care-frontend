import React from 'react';
import Card from 'components/Card';
import { Autocomplete } from '@material-ui/lab';
import { Input } from 'components/ui';
import { useTranslation } from 'react-i18next';

const languageOptions = [
  {
    label: 'English',
    code: 'en',
  },
  {
    label: 'French',
    code: 'fr',
  },
  {
    label: 'Spanish',
    code: 'es',
  },
];

const CardLanguage = () => {
  const { i18n, t } = useTranslation();

  const onChange = (e, value) => {
    if (!value) return;
    i18n.changeLanguage(value.code);
  };

  return (
    <div>
      <Card icon="comment-lines" title={t('Languages')}>
        <Autocomplete
          label=""
          name="language"
          variant="outlined"
          options={languageOptions}
          getOptionLabel={(value) => {
            const option = languageOptions.find((item) => item.code === value);
            return option ? option.label : '';
          }}
          value={i18n.language}
          onChange={onChange}
          renderOption={(option) => option.label}
          renderInput={(params) => (
            <Input
              {...params}
              placeholder={t('Select Language')}
              variant="outlined"
            />
          )}
        />
      </Card>
    </div>
  );
};

export default CardLanguage;
