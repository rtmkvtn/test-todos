import { ITodo } from '@t/index'
import classNames from 'classnames'

import Icon from '../../assets/Icon'
import Checkbox from './checkbox/Checkbox'
import styles from './TodoItem.module.scss'

type IProps = {
  className?: string
  item: ITodo
  onToggle(): void
  onRemove(): void
}

const TodoItem = ({ className, item, onToggle, onRemove }: IProps) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        className && className,
        item.isCompleted && styles.completed
      )}
    >
      <Checkbox isChecked={item.isCompleted} onClick={onToggle} />
      <p className={styles.text}>{item.text}</p>
      <div className={styles.rm} onClick={onRemove}>
        <Icon type="trash" size={20} className={styles.rm} />
      </div>
    </div>
  )
}

export default TodoItem
