import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button as MuiButton } from '@material-ui/core';

import { Icon } from 'components/ui';

const BackButton: FC<Props> = (props) => {
  const { title, route, onClick } = props;
  const history = useHistory();

  const pushByRoute = () => route && history.push(route)

  return (
    <MuiButton
      style={{ color: 'black' }}
      variant="contained"
      color="default"
      onClick={ !route ? onClick : pushByRoute }
    >
      <Icon icon="arrow-left" mr={10} /> {title}
    </MuiButton>
  );
};

export default BackButton;


interface Props {
  title: string
  route?: string
  onClick?: () => void
}
