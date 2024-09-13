import images from '~/assets/images';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import { CircleQuestionIcon, EllipsisVerticalIcon, HouseCarretRightIcon, SquareAIcon } from '~/Icons/Icons';
import Menu from '~/components/Popper/Menu';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <HouseCarretRightIcon />,
        title: 'Creator tools',
    },
    {
        icon: <SquareAIcon />,
        title: 'English',
    },
    {
        icon: <CircleQuestionIcon />,
        title: 'Feedback and help',
    },
];

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="TikTok" />
            </div>
            <Search />
            <div className={cx('actions')}>
                <Button primary>Log in</Button>
                <Menu items={MENU_ITEMS}>
                    <button className={cx('menu-btn')}>
                        <EllipsisVerticalIcon />
                    </button>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
