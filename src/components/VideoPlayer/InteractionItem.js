import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function InteractionItem({ icon, count }) {
    return (
        <button>
            <span className={cx('icon-wrapper')}>{icon}</span>
            <strong className={cx('count')}>{count}</strong>
        </button>
    );
}

export default InteractionItem;
