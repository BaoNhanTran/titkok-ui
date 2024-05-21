import { images } from '~/assets';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import config from '~/config';
import { PlusIcon } from '~/components/Icons';
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
            <div className={cx('action')}>
                <Button className={cx('upload-btn')} leftIcon={<PlusIcon />} outline to={config.routes.upload}>
                    Upload
                </Button>
                <Button primary>Log in</Button>
            </div>
        </header>
    );
}

export default Header;
