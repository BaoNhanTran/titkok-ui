import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { PlusIcon } from '~/components/Icons';
import Search from '~/layouts/components/Search';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="TikTok" />
            </div>
            <Search />
            <div className={cx('actions')}>
                <Button className={cx('upload-btn')} leftIcon={<PlusIcon />} primary>
                    Upload
                </Button>
                <Button primary>Log in</Button>
            </div>
        </header>
    );
}

export default Header;
