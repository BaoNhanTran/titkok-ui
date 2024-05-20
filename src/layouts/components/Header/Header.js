import { images } from '~/assets';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '~/layouts/components/Search';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="TikTok" />
            </div>
            <Search />
            <div className={cx('action')}></div>
        </header>
    );
}

export default Header;
