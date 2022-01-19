import React from 'react';
import { useHistory } from 'react-router-dom';
import { careTeamMemberRouteTemplates as routeTemplates } from 'routing/routeTemplates';
import { Grid, Button } from '@material-ui/core';
import Card from './Card';

const CardList = (props) => {
  const history = useHistory();
  const { type, items } = props;

  return (
    <Grid container direction="row" spacing={3}>
      {items.map((item) => {
        if (
          (type == 'TEMPLATE' && item.is_template == true) ||
          (type == 'WORKSPACE' && item.is_template != true)
        ) {
          return (
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              key={item.id_}
              style={{
                width: '300px',
              }}
            >
              <Card
                tab={type}
                item={item}
                onClick={() =>
                  history.push(
                    routeTemplates.carePlanWorkspace_One.replace(
                      ':id',
                      item.id_
                    )
                  )
                }
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default CardList;
