import { act, renderHook } from '@testing-library/react'

import { useTodos } from '@hooks/useTodos'

const MOCK_TODO_TEXT = 'Some todo text'

describe('useTodos hook', () => {
  test('Should have 0 length array of data on init', () => {
    const { result } = renderHook(useTodos)
    expect(result.current.data.length).toBe(0)
  })
  test('Should be possible to add todo item using addTodo method', () => {
    const { result } = renderHook(useTodos)
    act(() => result.current.addTodo(MOCK_TODO_TEXT))
    expect(result.current.data.length).toBe(1)
  })
  test('Should be impossible to add 2 todo items using addTodo method with same text', () => {
    const { result } = renderHook(useTodos)
    act(() => result.current.addTodo(MOCK_TODO_TEXT))
    act(() => result.current.addTodo(MOCK_TODO_TEXT))
    expect(result.current.data.length).toBe(1)
  })
  test('Should be possible to remove todo with removeTodo method by its id', () => {
    const { result } = renderHook(useTodos)
    act(() => result.current.addTodo(MOCK_TODO_TEXT))
    act(() => result.current.removeTodo(result.current.data[0].id))
    expect(result.current.data.length).toBe(0)
  })
  test('Should be possible to remove all todos with removeAllItems method', () => {
    const { result } = renderHook(useTodos)
    act(() => result.current.addTodo(MOCK_TODO_TEXT))
    act(() => result.current.addTodo(MOCK_TODO_TEXT + MOCK_TODO_TEXT))
    act(() => result.current.removeAllItems())
    expect(result.current.data.length).toBe(0)
  })
})
