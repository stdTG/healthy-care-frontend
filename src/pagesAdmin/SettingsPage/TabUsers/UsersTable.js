import React, { useContext } from 'react';
import {
  Paper as MuiPaper,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TablePagination as MuiTablePagination,
  TableRow as MuiTableRow,
  Button as MuiButton,
  Box as MuiBox,
} from '@material-ui/core';
import styled from 'styled-components';
import MessageButtonCell from './MessageButtonCell';
import RoleButtonCell from './RoleButtonCell';
import ChipWithIcons from 'pages/PatientsPage/components/chips/ChipWithIcons';

import { Avatar, Typography } from 'components/ui';
import Icon from 'components/ui/Icon';
import AppPopover from 'components/ui/AppPopover';
import { ConfirmDeleteDialogContext } from 'routing';
import AppTableContainer from '../../../components/Table/index';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import StatusCell from './StatusCell';

export const roles = {
  ['ADMIN']: 'Admin',
  ['SUPERVISOR']: 'Supervisor',
  ['DOCTOR']: 'Doctor',
  ['NURSE']: 'Nurse',
  ['OTHER']: 'Other',
  ['CONTENT_PUBLISHER']: 'Content publisher',
  ['BUSINESS_LEADER']: 'Business leader',
  ['SUPERADMIN']: 'Super admin',
  ['MEDICAL_ASSISTANT']: 'Medical assistant',
};

function UsersTable(props) {
  const {
    users,
    paginationInfo,
    setPageNumber,
    pageNumber,
    setRowsPerPage,
    rowsPerPage,
    onEdit,
    onDelete,
    loading,
  } = props;

  const { open: openConfirmDeleteDialog } = useContext(
    ConfirmDeleteDialogContext
  );

  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const getSubOrgName = (orgUnit) => {
    if (orgUnit?.__typename === 'SubOrganization') {
      return orgUnit?.name;
    }

    if (orgUnit?.__typename === 'CareTeam' && orgUnit?.subOrg?.name) {
      return orgUnit?.subOrg?.name;
    }

    return '—';
  };

  const getFormattedRole = (role) => {
    if (roles[role]) {
      return roles[role];
    }
    return role;
  };

  return (
    <AppTableContainer loading={loading} component={MuiPaper}>
      <MuiTable aria-label="simple table">
        <MuiTableBody>
          {users?.map((user) => {
            const {
              id_,
              lastName,
              firstName,
              role,
              orgUnit,
              memberSince,
              status,
            } = user || {};

            return (
              <>
                <MuiTableRow key={id_}>
                  <MuiTableCell align="left" style={{ width: '60px' }}>
                    <Avatar src={user.avatarPicture} />
                  </MuiTableCell>
                  <MuiTableCell>
                    <MuiBox display="flex" flexDirection="column">
                      <Typography variant="body1">
                        {firstName} {lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {getFormattedRole(role)}
                      </Typography>
                    </MuiBox>
                  </MuiTableCell>
                  <MuiTableCell>
                    <StatusCell
                      label={status}
                      color="#fff"
                      margin="0 12px 0 0"
                    />
                  </MuiTableCell>
                  <MuiTableCell>
                    <ChipWithIcons
                      label={getSubOrgName(orgUnit)}
                      variant="contained"
                    />
                  </MuiTableCell>
                  <MuiTableCell>
                    <ChipWithIcons
                      label={
                        orgUnit?.__typename === 'CareTeam' ? orgUnit?.name : '—'
                      }
                      variant="contained"
                    />
                  </MuiTableCell>
                  <MuiTableCell>
                    <Typography variant="body2" color="textSecondary">
                      {`${t('Member since')} ${format(
                        memberSince || Date.now(),
                        'dd/MM/yy'
                      )}`}
                    </Typography>
                  </MuiTableCell>
                  <MuiTableCell style={{ width: 90 }}>
                    <RoleButtonCell label={role} />
                  </MuiTableCell>
                  <MuiTableCell style={{ width: 30 }}>
                    <MessageButtonCell />
                  </MuiTableCell>
                  <MuiTableCell style={{ width: 30 }}>
                    <AppPopover
                      renderIcon={
                        <ChipWithIcons
                          label={<Icon icon="ellipsis-v" />}
                          background="#fff"
                        />
                      }
                      renderPopoverContent={
                        <RenderPopoverContentWrap>
                          {onEdit && (
                            <MenuButton
                              icon="pen"
                              text={t('Edit user')}
                              onClick={() => onEdit(user)}
                            />
                          )}
                          <MenuButton
                            icon="times"
                            text={t('Remove user')}
                            onClick={() => {
                              openConfirmDeleteDialog?.({
                                dialogTitle: t('Remove user'),
                                dialogWarningMessage: t(
                                  'Do you want remove this user?'
                                ),
                              }).then(
                                ({ isDeleted }) =>
                                  isDeleted && onDelete && onDelete(id_)
                              );
                            }}
                          />
                        </RenderPopoverContentWrap>
                      }
                    />
                  </MuiTableCell>
                </MuiTableRow>
              </>
            );
          })}
        </MuiTableBody>
      </MuiTable>

      <MuiTablePagination
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        count={paginationInfo?.totalItems}
        component="div"
        page={pageNumber}
      />
      <MuiTableCell
        align="center"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        Total users: {paginationInfo?.totalItems}
      </MuiTableCell>
    </AppTableContainer>
  );
}

export default UsersTable;

const MenuButton = ({ text, onClick, icon }) => {
  return (
    <div style={{ margin: '0px 16px', background: '#fff' }}>
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
        {text}
      </MuiButton>
    </div>
  );
};

const RenderPopoverContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
`;
