import { Popover as MuiPopover } from '@material-ui/core';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

const DraggableDialog: FC<Props> = ({children, ...props}) => {
  const { id, onClose, isOpen } = props;

  const [dragModal, setDragModal] = useState<{top: number, left: number}>(
    { top: 340, left: 740 },
  );

  const moveModal = useCallback((left, top) => {
    setDragModal({
      ...dragModal,
      top, left
    });
  }, [dragModal, setDragModal]);

  const [, drop] = useDrop<{top: number, left: number}, any, any>(() => ({
    accept: 'dragModal',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = delta && Math.round(item.left + delta.x);
      const top = delta && Math.round(item.top + delta.y);
      moveModal(left, top);
      return undefined;
    },
  }), [moveModal]);

  useEffect(() => {
    setTimeout(() => {
      drop(document.querySelector('.MuiPopover-root'))
    })
  })


  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'dragModal',
    item: { left: dragModal.left, top: dragModal.top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [dragModal]);

  useEffect(() => {
    setTimeout(() => {
      const paper: any = document.querySelector('.MuiPopover-paper')

      if (!paper) {
        return
      }
      drag(paper)
      paper.style.transform = `translate(${dragModal.left}px, ${dragModal.top}px)`
      paper.style.transition = 'none'
    })
  })
  return (
    <>
      <PopoverWrap
        id={id}
        open={isOpen}
        onClose={onClose}
        //@ts-ignore
        left={dragModal.left}
        top={dragModal.top}
      >
        {children}
      </PopoverWrap>
    </>
  )
}

export default DraggableDialog

const PopoverWrap = styled(MuiPopover)`
  .MuiPopover-paper {
    transform: ${(props: any) => `translate(${props.left}px, ${props.top}px)`} !important;
  }
`
interface Props {
  id: string | undefined
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void,
  isOpen: boolean,
}