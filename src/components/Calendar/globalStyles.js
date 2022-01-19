import { createGlobalStyle } from 'styled-components';

import colors from 'lib/colors';

const GlobalStyle = createGlobalStyle`
   .rbc-event {
      background-color: transparent;
      padding: 0;
      border: none;
      border-radius: 0;
      outline: none;
   }
   .rbc-event:focus {
      outline: none;
   }
   .rbc-day-slot .rbc-event {
      border: none;
     overflow: visible;
   }
   .rbc-event.rbc-selected {
      background-color: transparent;
   }
   .rbc-event-label {
      display: none;
   }
   .rbc-addons-dnd-resize-ns-icon {
      color: ${colors.green100};
   }
   .rbc-day-slot .rbc-time-slot {
      border: none;
   }
   .rbc-time-content {
      border-width: 1px;
   }
   .rbc-time-header.rbc-overflowing {
      border-width: 0;
   }
   .rbc-month-view, .rbc-time-view {
      padding: 25px;
      background: white;
      border-radius: 0px 0px 18px 18px;;
      border: none;
   }
   .rbc-header {
      color: #AAAAAA;
      
   }
   .rbc-time-header-cell .rbc-header {
     border: none;
   }
   .rbc-header + .rbc-header {
      border-left: none;
   }
   .rbc-month-row:last-child {
      border-bottom: 1px solid  ${colors.gray700};
   }
   
   .rbc-timeslot-group {
      min-height:unset;
   }
   .rbc-allday-cell {
      display: none;
   }
   .rbc-time-header-cell-single-day {
      display: block;
      
      .rbc-header{
      border: none;
    height: 100%;
      }
   }
   .rbc-current-time-indicator {
     background-color: ${(props) => props.theme.palette.warning.main};
     
     &:before {
       content: '';
       background: ${(props) => props.theme.palette.warning.main} ;
       height: 6px;
       width: 6px;
       border-radius: 50%;
       display: block;
       position: relative;
       top: -2px;
     }
   }
`;
export default GlobalStyle;
