import React from 'react';
import Icon from 'components/ui/Icon';
import AppPopover from 'components/ui/AppPopover';
import {
  RenderPopoverContentItem as ContentItem,
  RenderPopoverContentWrap as ContentWrap,
  RenderPopoverIconWrap as IconWrap,
} from 'pages/CarePlans/Builder/TabBuild/styled/SCard';
import { useTranslation } from 'react-i18next';

const CardActions = (props) => {
  const { onView, onModify, onDuplicate, onDelete } = props;
  const { t } = useTranslation();

  return (
    <AppPopover
      renderIcon={
        <IconWrap>
          <Icon icon="ellipsis-v" size="lg" style={{ color: '#0062F1' }} />
        </IconWrap>
      }
      renderPopoverContent={
        <ContentWrap>
          <ContentItem onClick={onModify}>
            <Icon icon={'pen-square'} mr={10} />
            {t('Edit care plan')}
          </ContentItem>

          <ContentItem onClick={onModify}>
            <Icon icon={'clone'} mr={10} />
            {t('Clone')}
          </ContentItem>

          <ContentItem onClick={onDelete}>
            <Icon icon={'trash'} mr={10} />
            {t('Delete')}
          </ContentItem>
        </ContentWrap>
      }
    />
  );
};

export default CardActions;
