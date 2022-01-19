import styled from 'styled-components';

export const PatientRecordPageLayout = styled.section`
  padding: 24px;
`;
export const CardsGridLayout = styled.section`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

  @media only screen and (max-width: 999.98px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  .card {
    :not(:last-child) {
      margin-bottom: 24px;
    }
  }
`;
export const CardsHeaderLayout = styled.section`
  display: grid;
  grid-template-columns: 2.05fr minmax(300px, 1fr);
  grid-gap: 24px;
  margin: 24px 0;

  @media only screen and (max-width: 999.98px) {
    grid-template-columns: 1fr;
  }
`;
export const SSpinnerWrap = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;
