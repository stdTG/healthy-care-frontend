import styled from 'styled-components';

export const PatientsPageContainer = styled.div`
  padding: 24px;

  header {
    margin-bottom: 16px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: ${(props) =>
      props.isOpen
        ? 'minmax(250px, 334px) minmax(500px, 1fr) auto'
        : 'auto 1fr auto'};
  }
  .body {
    display: grid;
    grid-template-columns: ${(props) =>
      props.isOpen ? 'minmax(250px, 350px) 1fr' : '1fr'};
  }
`;
