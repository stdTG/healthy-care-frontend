import React from 'react';

import { SCell } from 'components/Calendar/styled/dateCell';

 function DateCell(props) {
  const { value, children, range, isInactive } = props;
  
  return (
    <SCell
      isInactive={isInactive}
      isLastColumn={value === range[props.range.length - 1]}
      isDisabled={false}
    >
      {children}
    </SCell>
  );
}

export default DateCell;