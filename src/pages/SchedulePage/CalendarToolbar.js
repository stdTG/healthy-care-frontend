import React, { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Menu as MuiMenu, Button as MuiButton } from '@material-ui/core';
import { Icon } from 'components/ui';

import Toolbar from 'components/Calendar/components/Toolbar';
import { SButton } from 'components/Calendar/styled/toolbar';
import useLoadOrgUnitMembers from '../../pages/SchedulePage/EventDialog/hooks/useLoadOrgUnitMembers';
import { useTranslation } from 'react-i18next'; //TODO refactor

function CalendarToolbar({
  newAppointment,
  openTermDialog,
  openAddEventDialog,
  subOrgId,
  careTeamId,
  calendarFilter,
  setCalendarFilter,
  orgUnitMembers,
  ...props
}) {
  const [anchorEl, setAnchorEl] = useState(false);
  const isOpen = Boolean(anchorEl);
  const { t } = useTranslation();

  const options = [
    {
      label: t('Add event'),
      onClick: () => openAddEventDialog(),
      icon: 'calendar-plus',
    },
    {
      label: t('Set availabilities'),
      onClick: () => {
        setAnchorEl(null);
        openTermDialog();
      },
      icon: 'calendar-alt',
    },
  ];

  const onOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      orgUnitMembers={orgUnitMembers}
      calendarFilter={calendarFilter}
      setCalendarFilter={setCalendarFilter}
      {...props}
    >
      <SButton
        variant="outlined"
        startIcon={<CalendarTodayIcon />}
        style={{ fontSize: 14, marginRight: '16px', whiteSpace: 'nowrap' }}
        onClick={newAppointment}
      >
        {t('New appointment')}
      </SButton>

      <MuiButton
        size="small"
        aria-label="more"
        aria-controls="long-MuiMenu"
        aria-haspopup="true"
        onClick={onOpenMenu}
        style={{ background: '#fff', minWidth: 'auto' }}
      >
        <MoreVertIcon />
      </MuiButton>

      <MuiMenu
        id="long-MuiMenu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={onCloseMenu}
        style={{ position: 'absolute', left: '-50px', top: '25px' }}
      >
        {options.map(({ label, icon, onClick }) => (
          <div key={label} style={{ margin: '12px 16px', background: '#fff' }}>
            <MuiButton
              size="medium"
              color="primary"
              onClick={onClick}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '8px 16px',
              }}
              startIcon={<Icon icon={icon} style={{ fontSize: '16px' }} />}
            >
              {label}
            </MuiButton>
          </div>
        ))}
      </MuiMenu>
    </Toolbar>
  );
}

export default CalendarToolbar;
