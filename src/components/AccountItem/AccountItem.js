import { TickIcon } from '../Icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/7a2097efcb5b9944b9ea06c89c838627~c5_300x300.webp?lk3s=a5d48078&x-expires=1710846000&x-signature=pv6ZZtnSjsOxsmhPva%2FrTiXULT0%3D"
                alt="nguyenvana"
            />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <p>nguyenvana</p>
                    <TickIcon className={cx('tick')} />
                </h4>
                <p className={cx('name')}>Nguyen Van A</p>
            </div>
        </div>
    );
}

export default AccountItem;
