import styled from 'styled-components';

export const SCard = styled.div`
  position: relative;
  background-color: white;
  border-radius: 15px;
  padding: 20px 24px;
  &:hover {
    cursor: ${(props) => (props.cursor ? 'pointer' : 'default')};
  }
`;
export const SInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SFooter = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

export const RenderPopoverIconWrap = styled.div`
  position: absolute;
  right: 24px;
  top: 20px;
  color: gray;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e7effe;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;
export const RenderPopoverContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 15px;
`;
export const RenderPopoverContentItem = styled.div`
  padding: 10px 15px;
  border: 1px solid #f2f2f2;
  color: #0077ff;
  border-radius: 15px;
  margin-bottom: 10px;
  min-width: 200px;
  font-weight: 600;

  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    cursor: pointer;
    background-color: #0077ff;
    color: white;
  }
`;
