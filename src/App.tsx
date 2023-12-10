import { useState } from 'react'
import styles from './App.module.css'
import { Modal } from './components/Modal'

type ElementType = {
  xPoint: number
  yPoint: number
  text: string
  id: string
}

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentElementId, setCurrentElementId] = useState<string | undefined>(
    ''
  )

  const closeModalHandler = () => {
    setShowModal((prev) => !prev)
  }
  const [elementsArr, setElementsArr] = useState([] as ElementType[])

  const dragStart = (event: any, id?: string) => {
    event.dataTransfer.setData('text/plain', 'draggable')
    event.dataTransfer.effectAllowed = 'move'
    setIsDragging(true)
    setCurrentElementId(id)
  }

  const dragOverHandler = (event: any) => {
    event.preventDefault()
    if (isDragging) {
      const x = event.clientX
      const y = event.clientY
      setPosition({ x, y })
    }
  }

  const saveHandler = (e: any, textInput: string) => {
    console.log('submit')
    e.preventDefault()
    setElementsArr((prev) =>
      prev.find((item) => item.id === currentElementId)
        ? prev.map(
            (element) =>
              element.id === currentElementId
                ? {
                    ...element,
                    xPoint: position.x,
                    yPoint: position.y,
                    text: textInput,
                  }
                : element,
            []
          )
        : [
            ...prev,
            {
              id: crypto.randomUUID(),
              xPoint: position.x,
              yPoint: position.y,
              text: textInput,
            },
          ]
    )
    setShowModal((prev) => !prev)
  }

  const dragEndHandler = () => {
    setIsDragging(false)
    setShowModal(true)
  }
  console.log(showModal, 'showModal')

  const handleKeyPress = (event: any, id: string) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      setShowModal((prev) => !prev)
    }
    if (event.key === 'Delete') {
      setCurrentElementId('')
      setElementsArr((prev) => prev.filter((item) => item.id !== id))
      // Call your click handler function here
      // console.log('enter key clicked')
      // handleClick()
    }
  }

  return (
    <div className={styles.container}>
      {showModal && (
        <Modal
          submitFormHandler={saveHandler}
          closeHandler={closeModalHandler}
          itemInfo={{
            xAxis: position.x,
            yAxis: position.y,
            text: elementsArr.find((item) => item.id === currentElementId)
              ? elementsArr.find((item) => item.id === currentElementId)?.text
              : '',
          }}
        />
      )}
      <div onDragOver={dragOverHandler} className={styles.blankContainer}>
        {/* white part */}
        {elementsArr.map(({ text, xPoint, yPoint, id }) => (
          <div
            key={id}
            onKeyDown={(e) => handleKeyPress(e, id)}
            onClick={() => setCurrentElementId(id)}
            id={id}
            tabIndex={0}
            draggable='true'
            onDragStart={(e) => dragStart(e, id)}
            onDragEnd={dragEndHandler}
            style={{
              border: id === currentElementId ? '1px solid red' : '',
              position: 'absolute',
              left: `${xPoint}px`,
              top: `${yPoint}px`,
              cursor: 'grab',
              color: 'black',
            }}
          >
            {text}
          </div>
        ))}
      </div>
      <div className={styles.rightPart}>
        <div
          id='draggable'
          draggable='true'
          onDragStart={dragStart}
          onDragEnd={dragEndHandler}
          style={{
            cursor: 'grab',
            color: 'white',
          }}
        >
          Drag me
        </div>
      </div>
    </div>
  )
}

export default App
