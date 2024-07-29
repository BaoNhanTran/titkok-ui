import { CircleCheckIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/fed1e113786a14871b83192f1933728f~c5_300x300.webp?lk3s=a5d48078&nonce=44914&refresh_token=dbaa5323fef0d1eec505458485a039c8&x-expires=1722391200&x-signature=5q7fefJCGFDXttK80%2BSe20q0wRA%3D&shp=a5d48078&shcp=c1333099"
                alt="nguyenvana"
            />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <p>nguyenvana</p>
                    <CircleCheckIcon className={cx('tick')} />
                </h4>
                <p className={cx('name')}>Nguyen Van A</p>
            </div>
        </div>
    );
}

export default AccountItem;
