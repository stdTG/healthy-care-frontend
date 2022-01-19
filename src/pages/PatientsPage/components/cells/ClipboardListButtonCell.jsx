import React from 'react'
import { Icon } from "components/ui"
import { ChipWithIcons } from "../../components"

const ClipboardListButtonCell = () => (
  <ChipWithIcons
    label={'0/0'}
    startIcon={<Icon icon="clipboard-list" />}
    background='white'
  />
)

export default React.memo(ClipboardListButtonCell)