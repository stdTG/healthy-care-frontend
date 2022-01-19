import React, { useEffect, useState } from 'react';
import { Grid as MuiGrid } from '@material-ui/core';
import { IconButton, Space } from 'components/ui';
import { languagesAll } from 'countries-list';
import TabMasterInfoForm from 'pagesAdmin/SettingsPage/TabMaster/TabMasterInfoForm';
import Card from 'components/Card';
import Section from './Section';
import {
  useGet_Master_Org_InfoLazyQuery,
  useUpdate_Master_OrgMutation,
} from '../../../generated/graphql';
import styled from 'styled-components';
import CardSpinner from '../../../components/CardSpinner/index';
import { useTranslation } from 'react-i18next';

function TabMaster(props) {
  const [isEditInfoMode, setIsEditInfoMode] = useState(false);
  const [getMasterOrgInfo, { data, loading }] = useGet_Master_Org_InfoLazyQuery(
    {
      fetchPolicy: 'no-cache',
    }
  );
  const [updateMasterOrg] = useUpdate_Master_OrgMutation();

  const { t } = useTranslation();

  useEffect(() => {
    getMasterOrgInfo();
  }, []);

  const {
    name,
    fullAddress,
    created,
    language,
    email,
    phone,
    site,
    facebook,
    instagram,
    linkedin,
    logo,
    description,
  } = data?.orgUnit.masterOrgMe || {};

  const editMasterOrg = async (values) => {
    const response = await updateMasterOrg({
      variables: {
        record: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          fullAddress: {
            country: values.country,
            city: values.city,
            address: values.address,
            zipcode: values.zipcode,
          },
          site: values.site,
          language: values.language,
          facebook: values.facebook,
          linkedin: values.linkedin,
          instagram: values.instagram,
          description: values.description,
        },
      },
    });

    if (response?.data?.orgUnit?.updateMasterOrg?.ok) {
      getMasterOrgInfo();
    }
  };

  const userInfo = {
    firstColumn: [
      {
        title: t('Logo'),
        data: logo,
      },
      {
        title: t('Organisation name'),
        data: name,
      },
      {
        title: t('Address'),
        data: fullAddress
          ? `${fullAddress?.country} ${fullAddress?.city} ${fullAddress?.address} ${fullAddress?.zipcode}`
          : '',
      },
      {
        title: t('Date of foundation'),
        data: created,
      },
      {
        title: t('Default language'),
        data: languagesAll[language] && languagesAll[language].name,
      },
    ],
    secondColumn: [
      {
        title: t('Organisation email'),
        data: email,
      },
      {
        title: t('Organisation phone number'),
        data: phone,
      },
      {
        title: t('Organisation website'),
        data: site,
      },
      {
        title: t('Facebook'),
        data: facebook,
      },

      {
        title: t('LinkedIn'),
        data: linkedin,
      },
      {
        title: t('Instagram'),
        data: instagram,
      },
    ],
  };

  const onEditInfo = () => {
    setIsEditInfoMode(true);
  };

  return (
    <>
      <MuiGrid container spacing={4}>
        <MuiGrid item xs={12}>
          {isEditInfoMode ? (
            <TabMasterInfoForm
              onEdit={editMasterOrg}
              setEditMode={setIsEditInfoMode}
              initialData={{
                logo,
                name,
                country: fullAddress?.country,
                city: fullAddress?.city,
                address: fullAddress?.address,
                zipcode: fullAddress?.zipcode,
                created,
                language,
                email: email || '',
                phone: phone || '',
                site,
                facebook,
                instagram,
                linkedin,
                description,
              }}
            />
          ) : (
            <Card
              icon="info-circle"
              title={t('Organisation information')}
              EditButton={
                <IconButton
                  icon={isEditInfoMode ? 'check' : 'pen'}
                  onClick={onEditInfo}
                />
              }
            >
              <MuiGrid container>
                <MuiGrid item xs={6}>
                  <Space flexDirection="column">
                    {userInfo.firstColumn.map((info, index) => (
                      <Section key={index} {...info} />
                    ))}
                  </Space>
                </MuiGrid>
                <MuiGrid item xs={6}>
                  <Space flexDirection="column">
                    {userInfo.secondColumn.map((info, index) => (
                      <Section key={index} {...info} />
                    ))}
                  </Space>
                </MuiGrid>
              </MuiGrid>
              <Section title={t('Description')} data={description} />

              {loading && <CardSpinner size={40} />}
            </Card>
          )}
        </MuiGrid>

        {/*<MuiGrid item xs={6}>*/}
        {/*  <Card icon="sliders-h" title="Display settings"></Card>*/}
        {/*</MuiGrid>*/}
      </MuiGrid>
    </>
  );
}

export default TabMaster;

const CircularProgressWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
