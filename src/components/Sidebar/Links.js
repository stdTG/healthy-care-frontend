import React from 'react';
import { List as MuiList } from '@material-ui/core';

import { SIcon, SListItem, SNavLink } from './styled';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function Links({ list }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <MuiList>
      {list.map(({ text, icon, link, onClick }) => (
        <SNavLink
          key={t(text)}
          exact
          to={link}
          activeClassName={'selectedItem'}
          onClick={() => onClick && onClick(dispatch)}
        >
          <SListItem button disableGutters={true}>
            <SIcon>{icon}</SIcon>
          </SListItem>
        </SNavLink>
      ))}
    </MuiList>
  );
}
