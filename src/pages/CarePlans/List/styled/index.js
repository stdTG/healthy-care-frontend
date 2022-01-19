import styled from 'styled-components';

export const SInfoWrap = styled.div`
  border-bottom: 1px solid black;
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const SFooter = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

export const SCard = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px;

  &:hover {
    cursor: ${(props) => (props.cursor ? 'pointer' : 'default')};
  }
`;
