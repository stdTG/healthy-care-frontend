import React, { useEffect } from 'react'
import { useTagList } from "../hooks/useTagList";
import { FormControl, Icon } from 'components/ui';
import { MenuItem, Select, Box, Button } from '@material-ui/core';
import { FormApi } from 'final-form';
import { convertToTitleCase } from 'lib/utils';
import { useTranslation } from 'react-i18next';

interface TagsFieldI {
  form: FormApi,
  options: string[]
  initTags?: string[]
}

export const TagsField = React.memo(({ form, initTags, options }: TagsFieldI) => {

  const { tags, addTag, deleteTag } = useTagList(initTags)
  const { t } = useTranslation();

  useEffect(() => {
    form.change('tags', tags)
  }, [tags])

  return (
    <FormControl label={t('Tags')}>
      <Box>
        <Select
          onChange={addTag}
          style={{ width: '50%' }}
          defaultValue='title'
        >
          <MenuItem value='title' disabled >{t('Choose a tag')}</MenuItem>
          {
            options.map((option) => <MenuItem value={option} key={option} >{convertToTitleCase(option)}</MenuItem>)
          }
        </Select>
        <Box mt={2}>
          {
            tags.map((tag, idx) => (
              <Button
                key={idx}
                size='small'
                variant='outlined'
                endIcon={<Icon icon='times' style={{ width: '5px' }} />}
                onClick={() => deleteTag(idx)}
                style={{ margin: '4px' }}
              >
                {tag}
              </Button>
            ))
          }
        </Box>
      </Box>
    </FormControl>
  )
})
