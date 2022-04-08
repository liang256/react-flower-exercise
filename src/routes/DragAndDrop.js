import React from 'react'
import './DragAndDrop.css'

export function Draggable(props) {
  return (
    <div
        className={'draggable ' + props.className}
        draggable
        onDragStart={(e) => props.onDragStart(e, props.item)}
        style={{
          left: props.item.left,
          top: props.item.top
        }}
    >
        {props.item.name}
    </div>
  )
}

export function Droppable(props) {
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const renderDraggables = (properties) => {
    return properties.map(p => {
        return (
            <Draggable 
              key={p.name} 
              item={p} 
              className={props.propClassName}
              onDragStart={props.handleDragStart}
            />
        )
    })
  }

  return (
    <div 
        className={'droppable ' + props.className == undefined ? '' : props.className}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={props.onDrop}
    >
        {renderDraggables(props.properties)}
    </div>
  )
} 
