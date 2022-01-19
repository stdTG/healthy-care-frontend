import React from 'react';
import { format } from 'date-fns';

import {
  SActionsWrap,
  SDetailItem,
  SUser,
  SUserWrap,
  SAvatar,
} from '../../styled/detailsDialog';
import { Button } from 'components';
import { Typography, Icon as CustomIcon } from 'components/ui';
import { getDateFormat } from 'lib/utils';
import DialogContent from '../../../../components/Dialogs/DialogContent/Index';
import { useTranslation } from 'react-i18next';

function GetEventDetails(props) {
  const { close, initialData, onEditEvent } = props;
  const { t } = useTranslation();

  const Icon = ({ icon }) => <CustomIcon icon={icon} mr={8} mt={2} ml={4} />;
  return {
    title: t('Event details'),
    actions: (
      <SActionsWrap>
        <Button
          onClick={() => {
            close();
            onEditEvent();
          }}
          type="submit"
          title={t('Edit event')}
          icon="pen"
        />
      </SActionsWrap>
    ),
    content: (
      <DialogContent>
        <div style={{ display: 'flex' }}>
          <Icon icon="book" style={{ fontSize: '16px' }} />
          <Typography variant="h5" mb={5}>
            {props.initialData?.title}
          </Typography>
        </div>

        <SDetailItem>
          <Icon icon="user-friends" style={{ fontSize: '16px' }} />
          <SUserWrap>
            {props.initialData?.users?.map((user) => (
              <SUser>
                <SAvatar />
                <Typography style={{ fontSize: '15px', fontWeight: '600' }}>
                  {user.firstName} {user.lastName}
                </Typography>
              </SUser>
            ))}
          </SUserWrap>
        </SDetailItem>

        <SDetailItem>
          <Icon icon="calendar-day" />
          <div>
            <Typography>
              {format(
                getDateFormat(initialData.startDate),
                'EEE. d MMM. yyyy '
              )}
            </Typography>
            <Typography>
              {format(getDateFormat(initialData.startDate), ' h:mm a') +
                ' - ' +
                format(getDateFormat(initialData.endDate), 'h:mm a')}
            </Typography>
          </div>
        </SDetailItem>
      </DialogContent>
    ),
  };
}

export default GetEventDetails;
