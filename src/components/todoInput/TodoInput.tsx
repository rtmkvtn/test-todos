import { useEffect } from 'react'

import { FieldError, useForm } from 'react-hook-form'

import classNames from 'classnames'

import { Button } from '../index'
import styles from './TodoInput.module.scss'

type IFormValues = {
  todo: string
}

type IProps = {
  className?: string
  onAddCallback(todoText: string): boolean
}

const TodoInput = ({ className, onAddCallback }: IProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormValues>({
    defaultValues: {
      todo: '',
    },
  })

  const renderError = (errorObj: FieldError) => {
    const { type, message } = errorObj

    switch (type) {
      case 'required':
        return 'Todo text is required'
      case 'minLength':
        return 'Todo text must be longer than 2 symbols'
      case 'maxLength':
        return 'Todo text must be shorter than 30 symbols'
      case 'manual':
        return message
      default:
        return ''
    }
  }

  const submit = async ({ todo }: IFormValues) => {
    const result = onAddCallback(todo)
    if (!result) {
      setError('todo', {
        type: 'manual',
        message: 'Todo with entered text already exists',
      })
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <form
      id="add-todo-form"
      className={classNames(styles.wrapper, className && className)}
      onSubmit={handleSubmit(submit)}
    >
      <input
        className={classNames(styles.input, errors.todo && styles.inputError)}
        placeholder="Enter todo text..."
        {...register('todo', { required: true, minLength: 2, maxLength: 30 })}
      />
      {errors.todo && (
        <p className={styles.error}>{renderError(errors.todo)}</p>
      )}
      <Button
        className={styles.btn}
        text="Add"
        type="submit"
        disabled={Boolean(errors.todo)}
      />
    </form>
  )
}

export default TodoInput
