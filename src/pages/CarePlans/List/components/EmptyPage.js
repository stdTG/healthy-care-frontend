import React from 'react';
import {
  Button as MuiButton,
  Grid as MuiGrid,
  Typography as MuiTypography,
} from '@material-ui/core';
import styled from 'styled-components';
import { Icon, Space, Typography } from 'components/ui';
import { fade } from '@material-ui/core/styles';
import colors from 'lib/colors';
import { useTranslation } from 'react-i18next';

function EmptyPage({ onNew }) {
  const { t } = useTranslation();

  return (
    <MuiGrid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: '90vh' }}
    >
      <Space textAlign="center" size="medium" flexDirection="column">
        <Typography variant="h3" color="textSecondary">
          {t('You have no care plans yet.')}
        </Typography>
        <Typography variant="h3" color="textSecondary">
          {t(
            'Create the flow to interact with your patients for any disease or risk monitoring'
          )}
        </Typography>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <SCreateButton onClick={onNew}>
            <Icon icon="plus" />
          </SCreateButton>
        </div>
      </Space>
    </MuiGrid>
  );
}

export default EmptyPage;

const SCreateButton = styled.button`
  width: 350px;
  height: 200px;
  border: 2px dashed ${colors.gray100};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: ${colors.gray100};
  border-radius: 10px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: ${fade(colors.blue100, 0.1)};
  }
`;
