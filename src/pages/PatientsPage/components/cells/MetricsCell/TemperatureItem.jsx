import React from "react"
import styled from 'styled-components'
import { Icon } from "components/ui"
import { ChipWithIcons } from "../../../components"
import { ItemContainer } from './styled/itemContainer';

export const TemperatureItem = React.memo(({ label, color }) => (
    <ItemContainer>
      <ChipWithIcons
        color={color}
        label={label}
        startIcon={<Icon icon="thermometer-three-quarters" size="2x" />}
      />
      <DegSymbolContainer color={color}>
        &deg;
      </DegSymbolContainer>
    </ItemContainer> 
))

const DegSymbolContainer = styled.span`
  color: ${({ color }) => color ? color : 'black'};
  position: absolute;
  right: 15px;
  top: 5px;
`
