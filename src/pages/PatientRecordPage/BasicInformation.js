import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { languagesAll, countries } from 'countries-list';
import { useSelector } from 'react-redux';
import {
  Typography as MuiTypography,
  Grid as MuiGrid,
  Box as MuiBox,
} from '@material-ui/core';

import { Avatar, Space, Icon, IconButton } from 'components/ui';
import { SEX, sexData } from 'lib/enums/sex';
import { countAge } from 'lib/utils';
import SPaper from './styled/SPaper';
import { selectors as patientRecordSelectors } from '../../services/patientRecord/index';
import BasicInformationForm from '../../pages/PatientRecordPage/BasicInformationForm';
import BasicInformationModal from './BasicInformationModal';
import { useTranslation } from 'react-i18next';

function BasicInformation(props) {
  const patientCard = useSelector(patientRecordSelectors.getBasicInformation);
  const [isEditMode, setEditMode] = useState(false);
  const { t } = useTranslation();

  var {
    id,
    lastName,
    firstName,
    birthDate,
    language,
    email,
    phone,
    sex,
    fullAddress,
    avatarPicture,
  } = patientCard;

  // const addressSection = fullAddress?.address ? (
  //   <div>
  //     <div>
  //       <div>{fullAddress.address}</div>
  //       <div>
  //         {countries[fullAddress.country] &&
  //           countries[fullAddress.country].name}
  //       </div>
  //       {fullAddress.zipcode}, {fullAddress.city} City
  //     </div>
  //   </div>
  // ) : null;

  const addressSection = (
    <div>
      <div>
        <div>218 Lafayette St</div>
        <div>USA</div>
        NY 10012, New York City
      </div>
    </div>
  );

  const patientInfo = {
    firstColumn: [
      {
        title: t('Date of birth'),
        data: birthDate ? format(parseISO(birthDate), 'MMM do, yyyy') : null,
      },
      {
        title: t('Preferred language'),
        data: languagesAll[language] && languagesAll[language].name,
      },
      {
        title: t('Email'),
        data: email,
      },
    ],
    secondColumn: [
      {
        title: t('Phone number'),
        data: phone,
      },
      {
        title: t('Address'),
        data: addressSection,
      },
    ],
  };

  const getSection = (info, index) => (
    <MuiBox key={index}>
      <MuiTypography variant="subtitle2" color="textSecondary">
        {info.title}
      </MuiTypography>
      <MuiTypography variant="h5">
        {info.data || (
          <MuiTypography
            variant="subtitle2"
            color="textSecondary"
            style={{ fontWeight: '400' }}
          >
            {t('Empty')}
          </MuiTypography>
        )}
      </MuiTypography>
    </MuiBox>
  );

  return (
    <SPaper>
      {isEditMode ? (
        <BasicInformationModal
          open={isEditMode}
          onClose={() => setEditMode(false)}
        />
      ) : (
        <>
          <Space display="flex" justifyContent="space-between" mb={3}>
            <MuiTypography variant="h4">
              <Icon icon="user-circle" size="1x" mr={10} />
              {t('Basic information')}
            </MuiTypography>
            <Space size="small">
              <IconButton
                icon={isEditMode ? 'check' : 'pen'}
                onClick={() => setEditMode(true)}
              />
            </Space>
          </Space>
          <MuiGrid container>
            <MuiGrid
              container
              item
              xs={4}
              alignItems="center"
              direction="column"
            >
              <Avatar src={avatarPicture} size="large" />
              <MuiTypography
                variant="h4"
                style={{ fontWeight: 'bold', marginTop: '20px' }}
              >
                {firstName} {lastName}
              </MuiTypography>
              <MuiBox display="flex" alignItems="baseline">
                {sex !== SEX.undefined && (
                  <>
                    <Icon icon={sexData[sex]?.icon} size="1x" />
                    <span style={{ margin: '5px' }}>&sdot;</span>
                  </>
                )}

                <MuiTypography variant="h5">
                  {countAge(parseISO(birthDate))}
                </MuiTypography>
              </MuiBox>
            </MuiGrid>
            <MuiGrid item xs={4}>
              <Space flexDirection="column" mr={'8px'} ml={'8px'}>
                {patientInfo.firstColumn.map(getSection)}
              </Space>
            </MuiGrid>
            <MuiGrid item xs={4}>
              <Space flexDirection="column">
                {patientInfo.secondColumn.map(getSection)}
              </Space>
            </MuiGrid>
          </MuiGrid>
        </>
      )}
    </SPaper>
  );
}

export default BasicInformation;
