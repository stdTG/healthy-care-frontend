import styled from 'styled-components';

export const SLegendTitle = styled.div`
  display: flex;
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent};
  color: ${({ color }) => color};
  font-weight: 600;
  margin-bottom: ${(props) => `${props.mb}px`}} ;
`;

export const SLegendSubTitle = styled.div`
  font-weight: 600;
  color: ${(props) => props.color || 'black'};
`;

export const SIconWrap = styled.div`
  width: 28px;
  height: 28px;
  background-color: ${(props) => props.theme.palette[props.color].light};
  margin-right: 5px;
  color: ${(props) => props.theme.palette[props.color].main};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
