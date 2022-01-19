import React, {useState} from 'react'
import { Avatar } from 'components/ui';
import{
  Button as MuiButton,
  Menu as MuiMenu,
  Typography,
} from '@material-ui/core'
import Icon from '../../../components/ui/Icon';
import { useTranslation } from 'react-i18next';


export const TeamMemberSelect = React.memo(({ options, value, defaultValue, onChange }) => {

  const [currentOption, setCurrentOption] = useState(() => options.find((item) => item.id_ == value) || defaultValue)
  const [isOpen, onOpenMenu, onCloseMenu, anchorEl] = useHandleMenu();
  const { t } = useTranslation();

  function handleSelect(option) {
    onChange(option.id_)
    onCloseMenu()
  }

  return (
    <div>
      <MuiButton
        size="small"
        aria-label="more"
        aria-controls="long-MuiMenu"
        aria-haspopup="true"
        startIcon={<Icon icon='user-friends' style={{ width: '18px', height: '18px' }} />}
        endIcon={<Icon icon='chevron-down' style={{ width: '8px' }} />}
        onClick={onOpenMenu}
        style={{ background: '#fff', padding: '5px 16px' }}
      >
        {currentOption
          ? <Typography variant='h6'>{currentOption.firstName} {currentOption.lastName}</Typography>
          : <Typography variant='h6' style={{ color: '#bdbdbd' }} >{t('Loading')}...</Typography>
        }
      </MuiButton>

      <MuiMenu
        id="long-MuiMenu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={onCloseMenu}
        style={{ position: 'absolute', left: '0px', top: '65px', maxHeight: '50vh' }}
      >
        {
          options.map((option) => (
            <div key={option.id_} style={{ margin: '12px', background: '#fff' }}>
              <MuiButton
                size="medium"
                onClick={() => handleSelect(option)}
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  padding: '8px 16px',
                  background: currentOption?.id_ == option?.id_ ? '#3d5afe' : '',
                }}
                startIcon={<Avatar style={{ width: '40px', height: '40px' }} />}
              >
                <div>
                  <Typography align='left' variant='h6' style={{ color: currentOption?.id_ == option?.id_ ? '#fff' : '' }} >{option?.firstName} {option?.lastName}</Typography>
                  <Typography align='left' variant='h6' style={{ color: '#bdbdbd' }} >Nurse</Typography>
                </div>
              </MuiButton>
            </div>
          ))
        }
      </MuiMenu>
    </div>
  )
});

  const useHandleMenu = () => {
    const [anchorEl, setAnchorEl] = useState(false);
    const isOpen = Boolean(anchorEl);

    const onOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const onCloseMenu = () => {
      setAnchorEl(null);
    };

    return [isOpen, onOpenMenu, onCloseMenu, anchorEl]
  }
