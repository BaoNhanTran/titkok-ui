import { CircleCheckIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/7a2097efcb5b9944b9ea06c89c838627~c5_300x300.webp?lk3s=a5d48078&nonce=94152&refresh_token=5555e5b2b165d334ee30d9acf73c3121&x-expires=1716357600&x-signature=t7Lw6IvWIv2DpS8qoKI415veD5E%3D&shp=a5d48078&shcp=c1333099"
                alt="nguyenvana"
            />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <p>nguyenvana</p>
                    <CircleCheckIcon className={cx('check')} />
                </h4>
                <p className={cx('name')}>Nguyen Van A</p>
            </div>
        </div>
    );
}

export default AccountItem;
