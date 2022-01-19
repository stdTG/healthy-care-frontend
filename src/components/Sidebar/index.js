import React from 'react';

import { SListContainer, SLogo, SDrawer } from './styled';
import Links from './Links';

function Sidebar(props) {
  const { middle, bottom } = props;

  return (
    <SDrawer variant="permanent">
      <SLogo />
      <SListContainer height="100%">
        {middle && <Links list={middle} />}
      </SListContainer>
      <SListContainer>
        <Links list={bottom} />
      </SListContainer>
    </SDrawer>
  );
}

export default Sidebar;
