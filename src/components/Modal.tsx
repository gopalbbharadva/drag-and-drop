import { useState } from 'react'
import styles from './Modal.module.css'

type ModalPropsType = {
  itemInfo: { xAxis: number; yAxis: number; text: any }
  closeHandler: () => void
  submitFormHandler: (e: any, text: string, id: string) => void
}

export const Modal = ({
  itemInfo,
  closeHandler,
  submitFormHandler,
}: ModalPropsType) => {
  const { xAxis, yAxis } = itemInfo
  const [formState, setFormState] = useState({
    xAxis,
    yAxis,
    text: itemInfo.text,
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  console.log(formState.text, 'formState')

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>Edit Label</p>
        <button onClick={closeHandler} className={styles.closeButton}>
          X
        </button>
        <form className={styles.modalForm}>
          <label htmlFor='x-axis'>
            Text
            <input
              autoFocus
              value={formState.text}
              onChange={changeHandler}
              type='text'
              id='text'
              name='text'
              placeholder='This is a label'
            />
          </label>
          <label htmlFor='x-axis'>
            X
            <input
              value={formState.xAxis}
              onChange={changeHandler}
              type='number'
              id='x-axis'
              name='xAxis'
            />
          </label>
          <label htmlFor='y-axis'>
            Y
            <input
              value={formState.yAxis}
              onChange={changeHandler}
              type='number'
              id='y-axis'
              name='yAxis'
            />
          </label>
          <button
            type='button'
            onClick={(e) => submitFormHandler(e, formState.text, '')}
            className={`${styles.resetButton} ${styles.saveButton}`}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
