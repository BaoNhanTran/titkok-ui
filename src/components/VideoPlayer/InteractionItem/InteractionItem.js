import classNames from 'classnames/bind';
import styles from '../VideoPlayer.module.scss';
const cx = classNames.bind(styles);

function ButtonActionItem({ icon, count }) {
    return (
        <button className={cx('action-btn')}>
            <span className={cx('icon-wrapper')}>{icon}</span>
            <strong className={cx('count')}>{count}</strong>
        </button>
    );
}

export default ButtonActionItem;
