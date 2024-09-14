import { CircleCheckIcon } from '~/Icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/5c9f9e8c9edfad37275d60bcf9785450~c5_100x100.jpeg?lk3s=a5d48078&nonce=40346&refresh_token=4147e974c047c410266c9ae3cbd2b869&x-expires=1726178400&x-signature=DWPNvfjHN0yYX3TGQC1ZRNvIO%2FA%3D&shp=a5d48078&shcp=b59d6b55"
                alt="nguyenvana"
            />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <p>nguyenvanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    <CircleCheckIcon className={cx('tick')} />
                </h4>
                <p className={cx('name')}>Nguyen Van Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            </div>
        </div>
    );
}

export default AccountItem;
