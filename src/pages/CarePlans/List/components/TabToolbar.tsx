import React, { FC } from 'react';
import { Search, Space } from 'components/ui';
import ToolbarButtonNew from 'pages/CarePlans/List/components/ToolbarButtonNew';
import { CarePlanType } from 'pages/CarePlans/constants';
import { GqlCarePlanType } from '../../../../generated/graphql';
import { useTranslation } from 'react-i18next';

interface Props {
  type: GqlCarePlanType
  onRefresh: any
  onNew: any
}

const TabToolbar: FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <Space display="flex" mb={2} flex="auto">
      <Search placeholder={t('Search protocols')} />
      <ToolbarButtonNew type={props.type} onClick={props.onNew}/>
    </Space>
  );
};

export default TabToolbar;
