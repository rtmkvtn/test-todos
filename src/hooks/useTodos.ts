import { useState } from 'react'

import { compareStrings, generateTodoItem } from '@helpers/index'
import { ITodo } from '@t/index'

export const useTodos = () => {
  const [data, setData] = useState<ITodo[]>([])

  const getItemById = (id: string) => {
    return data.find((x) => x.id === id)
  }

  const updateDataWithNewItem = (item: ITodo) => {
    const newData = [...data.filter((x) => x.id !== item.id), item]
    setData(newData.sort((a, b) => a.index - b.index))
  }

  const addTodo = (todoText: string) => {
    if (data.find((x) => compareStrings(x.text, todoText))) {
      return false
    }
    setData([...data, generateTodoItem(todoText, data.length - 1)])
    return true
  }

  const removeTodo = (id: string) => {
    setData([...data.filter((x) => x.id !== id)])
  }

  const toggleItemCompletion = (id: string) => {
    const targetItem = getItemById(id)
    if (!targetItem) {
      return
    }

    targetItem.isCompleted = !targetItem.isCompleted
    updateDataWithNewItem(targetItem)
  }

  const removeAllItems = () => {
    setData([])
  }

  return { data, addTodo, removeTodo, toggleItemCompletion, removeAllItems }
}
