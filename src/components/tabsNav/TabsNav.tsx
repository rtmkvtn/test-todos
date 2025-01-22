import { useLayoutEffect, useRef } from 'react'

import classNames from 'classnames'

import styles from './TabsNav.module.scss'

type ITabProps = {
  id: string
  label: string
}

type IProps<T extends ITabProps[]> = {
  tabs: T
  activeTab?: T[number]['id']
  onChange(value: T[number]['id']): void
  className?: string
}

const TabsNav = <T extends ITabProps[]>({
  tabs,
  activeTab,
  onChange,
  className,
}: IProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleClick = (value: string): void => {
    if (value !== activeTab) {
      onChange(value)
    }
  }

  useLayoutEffect(() => {
    if (!wrapperRef?.current) {
      return
    }

    const currentActiveEl = document.querySelector(`.${styles.tabActive}`)
    if (currentActiveEl) {
      currentActiveEl.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }, [activeTab, wrapperRef])

  return (
    <div
      className={classNames(styles.wrapper, className && className)}
      ref={wrapperRef}
    >
      {tabs.map(({ id, label }) => (
        <div
          key={`tabs-tab-${id}}`}
          className={classNames(
            styles.tab,
            activeTab === id && styles.tabActive
          )}
          onClick={() => handleClick(id)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export default TabsNav
