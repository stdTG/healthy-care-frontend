import styled from 'styled-components';

export const Drawer = styled.div`
  background: white;
  padding: 24px 24px 0;
  height: 100vh;

  .rbc-time-header-cell-single-day {
    display: none;
  }
  .rbc-today {
    background: none;

    .rbc-timeslot-group div {
      border-bottom: 1px solid #eee;
      position: relative;
      top: 8px;
    }

    .rbc-timeslot-group:first-child div:first-child {
      border-top: 1px solid #eee;
    }
  }
  .rbc-time-content {
    border: none;
    overflow: hidden;
  }
  .rbc-time-content > * + * > *,
  .rbc-timeslot-group {
    border: none;
  }
  .rbc-time-view {
    padding: 0;
  }
`;
