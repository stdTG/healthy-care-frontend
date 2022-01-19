import AppPopover from 'components/ui/AppPopover';
import SRenderPopoverIconWrap from 'pages/PatientRecordPage/styled/SRenderPopoverIconWrap';
import { Icon } from 'components/ui';
import {
  RenderPopoverContentItem,
  RenderPopoverContentWrap,
} from 'pages/CarePlans/Builder/TabBuild/styled/SCard';
import React, { useContext } from 'react';
import { ConfirmDeleteDialogContext } from 'routing';
import { useTranslation } from 'react-i18next';

const CardPopover = ({
  id,
  toggleEditMode,
  onDelete,
  deleteDialogTitle,
  deleteDialogMessage,
  loading,
}) => {
  const { open: openConfirmDeleteDialog } = useContext(
    ConfirmDeleteDialogContext
  );
  const { t } = useTranslation();

  return (
    <div>
      <AppPopover
        renderIcon={
          <SRenderPopoverIconWrap>
            <Icon icon="ellipsis-v" size="lg" />
          </SRenderPopoverIconWrap>
        }
        renderPopoverContent={
          <RenderPopoverContentWrap>
            <RenderPopoverContentItem onClick={() => toggleEditMode(id, true)}>
              {t('Edit')}
            </RenderPopoverContentItem>

            <RenderPopoverContentItem
              onClick={() => {
                openConfirmDeleteDialog?.({
                  dialogTitle: deleteDialogTitle || t('Delete'),
                  dialogWarningMessage:
                    deleteDialogMessage || 'Do you want delete this?',
                }).then(({ isDeleted }) => isDeleted && onDelete(id));
              }}
            >
              {t('Delete')}
            </RenderPopoverContentItem>
          </RenderPopoverContentWrap>
        }
      />
    </div>
  );
};

export default CardPopover;
