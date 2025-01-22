import { ITodo } from '@t/index'

export const generateTodoItem = (text: string, lastIndex: number): ITodo => {
  return {
    id: crypto.randomUUID(),
    index: lastIndex + 1,
    isCompleted: false,
    text,
  }
}

export const compareStrings = (strOne: string, strTwo: string): boolean => {
  const normalizedStrOne = strOne.split(' ').join('').toLowerCase()
  const normalizedStrTwo = strTwo.split(' ').join('').toLowerCase()
  return normalizedStrOne === normalizedStrTwo
}
