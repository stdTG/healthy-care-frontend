import React from 'react';
import { format, differenceInMinutes } from 'date-fns';
import { Box as MuiBox } from '@material-ui/core';

import {
  STimeTag,
  STagsWrap,
  STitleWrap,
  SEmptyHint,
} from 'pages/SchedulePage/styled/chooseDateDialog';
import { Icon, Typography } from 'components/ui';
import colors from 'lib/colors';

function TimeSlot(props) {
  const { icon, title, timeSlots, onSelect, selectedTime } = props;

  return (
    <MuiBox display="flex" flexDirection="row">
      <STitleWrap>
        <Icon icon={icon} mr={5} style={{ color: colors.gray100 }} />
        <Typography variant="h5" color="textSecondary">
          {title}
        </Typography>
      </STitleWrap>

      <STagsWrap>
        {timeSlots.length === 0 ? (
          <SEmptyHint>No available slot</SEmptyHint>
        ) : (
          timeSlots.map(({ startTime, endTime }, index) => (
            <STimeTag
              isSelected={
                selectedTime?.startTime &&
                differenceInMinutes(startTime, selectedTime?.startTime) === 0
              }
              key={index}
              onClick={() => {
                onSelect({ startTime, endTime });
              }}
            >
              {format(startTime, 'h:mm a')}
            </STimeTag>
          ))
        )}
      </STagsWrap>
    </MuiBox>
  );
}

export default TimeSlot;
