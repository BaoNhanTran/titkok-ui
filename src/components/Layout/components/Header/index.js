import images from '~/assets/images';
import { ClearIcon, LoadingIcon, SearchIcon } from '~/components/Icon';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="Tittok" />
            </div>
            <div className={cx('search')}>
                <input placeholder="Search" />
                <div className={cx('icon-wrapper')}>
                    <ClearIcon className={cx('clear-btn')} />
                    <LoadingIcon className={cx('loading')} />
                </div>
                <span className={cx('separate')}></span>
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
            <div className={cx('actions')}></div>
        </header>
    );
}

export default Header;
