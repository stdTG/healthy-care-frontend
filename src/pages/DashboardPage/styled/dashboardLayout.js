import styled from 'styled-components';

export const DashboardContainer = styled.section`
  padding: 0 24px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: minmax(30%, 70%) 450px;
`;
export const DashboardHeader = styled.header`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DashboardCards = styled.article`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  .card {
    min-height: 250px;
  }
`;
