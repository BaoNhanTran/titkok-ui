import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function InteractionItem({ icon, count }) {
    const [isInteracted, setIsInteracted] = useState(false);

    return (
        <button className={cx({ interacted: isInteracted })} onClick={() => setIsInteracted(!isInteracted)}>
            <span className={cx('icon-wrapper')}>{icon}</span>
            <strong className={cx('count')}>{count}</strong>
        </button>
    );
}

export default InteractionItem;
