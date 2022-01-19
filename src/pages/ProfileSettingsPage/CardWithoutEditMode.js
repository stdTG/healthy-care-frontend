import Card from 'components/Card';
import { Avatar, Icon, IconButton, Space } from 'components/ui';
import {
  Box as MuiBox,
  CircularProgress,
  Grid as MuiGrid,
  Typography as MuiTypography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { SEX, sexData } from 'lib/enums/sex';
import { countAge } from 'lib/utils';
import { parseISO } from 'date-fns';
import React from 'react';
import Section from 'pages/ProfileSettingsPage/Section';
import { speciality as specialityList } from 'lib/enums/speciality';
import { countries } from 'countries-list';
import { map, pipe, toPairs } from 'ramda';
import {
  CardContainer,
  MainUserDataContainer,
  UserInformationColumns,
} from './styled/cardWithoutEditModeLayot';
import Username from './components/Username';

import AnneAdler from 'assets/avatarImages/AnneAdler.png';

const CardWithoutEditMode = (props) => {
  var {
    isEditInfoMode,
    onEditInfo,
    firstName,
    lastName,
    sex,
    birthDate,
    userInfo,
    description,
    loading,
    speciality,
    country,
    city,
    address,
    zipCode,
  } = props;

  birthDate = '1986-06-21T10:12:06.964Z';

  userInfo.firstColumn[0].data = 'Online';
  userInfo.secondColumn[0].data = 'anne.adler.doctor@nehiyr.com';
  userInfo.secondColumn[1].data = '+1 810-356-0628';

  userInfo.thirdColumn[0].data = 'Occupational therapy';
  userInfo.thirdColumn[1].data = 'Mental health';

  const { t, i18n } = useTranslation();

  const countriesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(countries);

  const getCountry = () => countriesArr.find((i) => i.code === country);

  var fullAddress = `${getCountry()?.name.name || ''} ${city || ''} ${
    address || ''
  } ${zipCode || ''}`;

  fullAddress = '3 Greenwich Ave, New York, NY 10014-3543';

  const getSpeciality = (arr, value) => {
    const speciality = arr?.find((item) => item.value === value);
    return speciality?.name;
  };

  return (
    <>
      <Card
        icon={!loading && 'user-circle'}
        title={!loading && t('Your profile')}
        EditButton={
          !loading && (
            <IconButton
              icon={isEditInfoMode ? 'check' : 'pen'}
              onClick={onEditInfo}
            />
          )
        }
        height="100%"
      >
        {loading ? (
          <MuiGrid
            container
            justify="center"
            alignItems="center"
            style={{ height: '300px' }}
          >
            <CircularProgress />
          </MuiGrid>
        ) : (
          <>
            <CardContainer>
              <MainUserDataContainer>
                <Avatar src={AnneAdler} size="large" />
                <Username firstName={firstName} lastName={lastName} />
                <MuiBox display="flex" alignItems="baseline">
                  {sex !== SEX.undefined && (
                    <>
                      <Icon icon={sex && sexData[sex].icon} size="1x" />
                      <span style={{ margin: '5px' }}>&sdot;</span>
                    </>
                  )}
                  <MuiTypography variant="h5">
                    {countAge(parseISO(birthDate))}
                  </MuiTypography>
                </MuiBox>

                <MuiTypography variant="h5">
                  {getSpeciality(specialityList, speciality)}
                </MuiTypography>
              </MainUserDataContainer>

              <UserInformationColumns>
                <div>
                  {userInfo.firstColumn.map((info, index) => (
                    <Section key={index} {...info} />
                  ))}
                </div>

                <div>
                  {userInfo.secondColumn.map((info, index) => (
                    <Section key={index} {...info} />
                  ))}
                  <Section title={t('Address')} data={fullAddress} />
                </div>

                <div>
                  {userInfo.thirdColumn.map((info, index) => (
                    <Section key={index} {...info} />
                  ))}
                </div>
              </UserInformationColumns>
            </CardContainer>
            <Section title={t('Description')} data={description} />
          </>
        )}
      </Card>
    </>
  );
};

export default CardWithoutEditMode;
