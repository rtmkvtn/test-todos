import { useMemo, useState } from 'react'

import { useTodos } from '@hooks/useTodos'

import { Button, TabsNav, TodoInput, TodoItem } from '@components/index'

import './App.module.scss'
import styles from './App.module.scss'

const TABS = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'active',
    label: 'Active',
  },
  {
    id: 'completed',
    label: 'Completed',
  },
]
function App() {
  const [view, setView] = useState<(typeof TABS)[number]['id']>('all')
  const {
    data: todos,
    addTodo,
    removeTodo,
    removeAllItems: clearTodos,
    toggleItemCompletion,
  } = useTodos()

  const items = useMemo(() => {
    switch (view) {
      case 'active':
        return todos.filter((x) => !x.isCompleted)
      case 'completed':
        return todos.filter((x) => x.isCompleted)
      default:
        return todos
    }
  }, [view, todos])

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.headerText}>Todos List</h1>
        </header>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <TodoInput onAddCallback={addTodo} />
          </div>
          <div className={styles.contentBody}>
            <TabsNav tabs={TABS} onChange={setView} activeTab={view} />
            {items.length > 0 ? (
              items.map((x) => (
                <TodoItem
                  item={x}
                  key={x.id}
                  onToggle={() => toggleItemCompletion(x.id)}
                  onRemove={() => removeTodo(x.id)}
                />
              ))
            ) : (
              <p>{`No ${view !== 'all' ? `${view} ` : ''} items...`}</p>
            )}
          </div>
          {todos.length > 0 && (
            <div className={styles.contentFooter}>
              <Button text="Clear All" onClick={clearTodos} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
