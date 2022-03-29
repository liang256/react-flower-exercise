import React from 'react'

export function Draggable(props) {
  const handleDragStart = (e, name) => {
    e.dataTransfer.setData('id', name)
  }
  return (
    <div 
        key={props.name} 
        className={'draggable ' + props.className}
        draggable
        onDragStart={(e) => handleDragStart(e, props.name)}
    >
        {props.name}
    </div>
  )
}

export function Droppable(props) {
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const renderDraggables = (properties) => {
    return properties.map(name => {
        return (
            <Draggable key={name} name={name} className={props.propClassName}/>
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
