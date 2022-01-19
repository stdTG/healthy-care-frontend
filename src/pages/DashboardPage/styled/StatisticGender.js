import styled from 'styled-components';

export const SDoughnutWrap = styled.div`
  display: grid;
  grid-gap: 24px;
  place-items: center;
  grid-template-columns: repeat(2, 1fr);

  canvas {
    width: 120px !important;
    height: auto !important;
    max-width: 150px;
  }
`;
export const SLegendTitleWrap = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

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
