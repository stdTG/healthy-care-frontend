import React from 'react'
import { ChipWithIcons } from '../../components';
import { Icon } from 'components/ui';
import { useHistory } from 'react-router-dom';

const MessageButtonCell = ({ patientId }) =>  {
  const history = useHistory()
  return (
    <ChipWithIcons
      label={<Icon icon="comment" />}
      margin='0 12px'
      background='#fff'
      onClick={() => history.push(`/chat?patientId=${patientId}`) }
    />
  )
}

export default React.memo(MessageButtonCell)
