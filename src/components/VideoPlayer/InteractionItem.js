import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function InteractionItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('icon-wrapper')}>{data.icon}</span>
            <strong className={cx('count')}>{data.count}</strong>
        </div>
    );
}

InteractionItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default InteractionItem;
