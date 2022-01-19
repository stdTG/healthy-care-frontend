import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Grid as MuiGrid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Card from 'components/Card';
import { languagesAll } from 'countries-list';
import CardWithoutEditMode from './CardWithoutEditMode';
import NotificationSettings from './NotificationSettings';
import { GET_PROFILE_INFO } from './gqlSchemes/getProfileInfo';
import { UPDATE_PROFILE_INFO } from './gqlSchemes/updateProfileInfo';

import ProfileEditModal from './ProfileEditModal';
import CardLanguage from './CardLanguage';

function ProfileSettingsPage(props) {
  const [getProfileInfo, { data, loading }] = useLazyQuery(GET_PROFILE_INFO, {
    fetchPolicy: 'no-cache',
  });

  const [updateProfileInfo] = useMutation(UPDATE_PROFILE_INFO);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProfileInfo();
  }, [open]);

  const { t } = useTranslation();

  const subOrg = 'subOrgMock';
  const careTeam = 'careTeamMock';
  const email = data?.user?.dashboard?.me?.byEmail?.email;
  const phoneNumber = data?.user?.dashboard?.me?.byPhone?.phone;
  const {
    firstName,
    lastName,
    speciality,
    language,
    description,
    memberSince,
    status,
    sex,
    birthDate,
  } = data?.user?.dashboard?.me || {};

  const { country, city, zipcode, address } =
    data?.user?.dashboard?.me?.fullAddress || {};

  const userInfo = {
    firstColumn: [
      {
        title: t('Status'),
        data: status,
      },
      {
        title: t('Member since'),
        data: memberSince,
      },
      {
        title: t('Preferred language'),
        data: languagesAll[language] && languagesAll[language].name,
      },
    ],
    secondColumn: [
      {
        title: t('Email'),
        data: email,
      },
      {
        title: t('Phone number'),
        data: phoneNumber,
      },
    ],
    thirdColumn: [
      {
        title: t('Sub organisation'),
        data: subOrg,
      },
      {
        title: t('Care team'),
        data: careTeam,
      },
    ],
  };

  const onEditInfo = () => {
    setOpen(true);
  };

  const onSubmit = async (values) => {
    updateProfileInfo({
      variables: {
        record: {
          firstName: values.firstName,
          lastName: values.lastName,
          sex: values.sex,
          language: values.language,
          birthDate: values.birthDate && format(values.birthDate, 'yyyy-MM-dd'),
          address: {
            country: values.country,
            city: values.city,
            zipcode: values.zipcode,
            address: values.address,
          },
          description: values.description,
        },
      },
    })
      .then(console.log)
      .catch(console.log);

    // console.log(formatISO(values.birthDate))
    // console.log(values);
    // console.log(format(values.birthDate, 'yyyy-MM-dd'));

    setOpen(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <MuiGrid container spacing={4}>
        <MuiGrid item xs={12} md={8}>
          <CardWithoutEditMode
            isEditInfoMode={open}
            onEditInfo={onEditInfo}
            firstName={firstName}
            lastName={lastName}
            sex={sex}
            birthDate={birthDate}
            userInfo={userInfo}
            description={description}
            speciality={speciality}
            country={country}
            city={city}
            address={address}
            zipCode={zipcode}
            loading={loading}
          />
          <ProfileEditModal
            open={open}
            onClose={() => setOpen(false)}
            initialValues={{
              firstName,
              lastName,
              sex,
              birthDate,
              description,
              speciality,
              country,
              city,
              address,
              zipcode,
              phoneNumber,
              language,
            }}
            onSubmit={onSubmit}
          />
        </MuiGrid>

        <MuiGrid container direction="column" item spacing={2} xs={12} md={4}>
          <MuiGrid item>
            <CardLanguage />
          </MuiGrid>
          <MuiGrid item>
            <NotificationSettings />
          </MuiGrid>
          <MuiGrid item>
            <Card icon="copy" title={t('Export personal data')} />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </div>
  );
}

export default ProfileSettingsPage;
