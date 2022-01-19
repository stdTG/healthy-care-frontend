import {
  ClickAwayListener as MuiClickAwayListener,
  MenuList as MuiMenuList,
  Popper as MuiPopper,
  Paper as MuiPaper,
  Grow as MuiGrow,
  Box as MuiBox,
} from '@material-ui/core';
import { MuiMenuButton } from '../../../components';

export const PatientActionsMenu = ({
  open,
  anchorRef,
  onCloseMenu,
  handleListKeyDown,
  options
}) => {
  return (
    <MuiPopper
      open={open}
      anchorEl={anchorRef.current}
      transition
      disablePortal
      role={undefined}
      style={{ zIndex: 2 }}
      placement={'left-start'}
    >
      {({ TransitionProps, placement }) => (
        <MuiGrow {...TransitionProps}>
          <MuiPaper>
            <MuiClickAwayListener onClickAway={onCloseMenu}>
              <MuiMenuList
                autoFocusItem={open}
                id="patient-actions"
                onKeyDown={handleListKeyDown}
              >
                <MuiBox display='grid' gridGap={12} padding='12px 0'>
                  {options.map(({ label, icon, action, variant }) => (
                    <MuiMenuButton
                      key={label}
                      label={label}
                      icon={icon}
                      action={action}
                      variant={variant}
                    />
                  ))}
                </MuiBox>
              </MuiMenuList>
            </MuiClickAwayListener>
          </MuiPaper>
        </MuiGrow>
      )}
    </MuiPopper>
  )
}