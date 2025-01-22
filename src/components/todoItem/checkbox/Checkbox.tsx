import classNames from 'classnames'

import Icon from '../../../assets/Icon'
import styles from './Checkbox.module.scss'

type IProps = {
  className?: string
  isChecked?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

const Checkbox = ({ className, isChecked, isDisabled, onClick }: IProps) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        className && className,
        isChecked && styles.checked,
        isDisabled && styles.disabled
      )}
      onClick={onClick}
    >
      {isChecked && <Icon type="check" size={16} />}
    </div>
  )
}

export default Checkbox
