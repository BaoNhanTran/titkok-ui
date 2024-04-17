import PropTypes from 'prop-types';
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

InteractionItem.propType = {
    icon: PropTypes.node,
    count: PropTypes.node,
};

export default InteractionItem;
