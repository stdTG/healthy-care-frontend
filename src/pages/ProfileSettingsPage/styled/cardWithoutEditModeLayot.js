import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
`;
export const MainUserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px 0 0;
`;
export const UserInformationColumns = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    padding: 8px;

    :nth-child(2) {
      white-space: nowrap;
    }
  }
`;
