import styled from 'styled-components';

export const RowLayout = styled.div`
  display: grid;
  grid-template-columns: 60px minmax(150px, auto) 150px 1fr auto;
  grid-gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #eceff1;
`;

// grid-template-columns: 60px minmax(100px, auto) 150px 150px 1fr auto;
