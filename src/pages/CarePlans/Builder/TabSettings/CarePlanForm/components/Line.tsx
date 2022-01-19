import React from 'react'
import colors from 'lib/colors';

export const Line = React.memo(()=> {
    return (
        <hr style={{ border: `1px solid ${colors.gray500}`, marginBottom: '16px'}} />
    )
})