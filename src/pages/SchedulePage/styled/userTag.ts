import styled from 'styled-components';

interface Props {
  isAppointment: boolean
  isSelected: boolean
  disabled: boolean
}

const getBackgroundColor = ({ isAppointment, disabled, isSelected }: Props) => {
  if (disabled && isAppointment) {
    return '#A6C1F5'
  }

  if (disabled && !isAppointment) {
    return '#909090'
  }

  if (isSelected) {
    return '#C1FABD'
  }

  if (isAppointment) {
    return '#4D83EC'
  } else {
    return '#929292'
  }
}

const getTextColor = ({ isAppointment, isSelected, disabled }: Props) => {
  if (disabled) {
    return 'white'
  }

  if (isSelected) {
    return 'black'
  }

  return 'white'
}

const UserTag = styled.span<Props>`
  background-color: ${(props) => getBackgroundColor(props)};
  color: ${(props) => getTextColor(props)};
  display: flex;
  border-radius: 3px;
  padding: 1px 2px;
  margin-bottom: 2px;
  margin-top: 2px;
`

export default UserTag