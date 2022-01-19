import React from "react"
import styled from "styled-components"
import { ChipWithIcons } from ".."

interface IShowMoreButtonProps {
  isHidden: boolean
  onClick: (status: boolean) => void
  labelOnHidden: JSX.Element | string
  labelOnDisplayed: JSX.Element | string
}

const ShowMoreButton = React.memo(({
  isHidden,
  labelOnHidden,
  labelOnDisplayed,
  onClick
}: IShowMoreButtonProps) => (
  <div onClick={() => onClick(!isHidden)}>
    <ChipWithIcons label={isHidden ? labelOnHidden : labelOnDisplayed} />
  </div>
))
export default ShowMoreButton
