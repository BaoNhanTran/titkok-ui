import images from '~/assets/images';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import { CircleQuestionIcon, EllipsisVerticalIcon, HouseCarretRightIcon, SquareAIcon } from '~/Icons';
import Menu from '~/components/Popper/Menu';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <HouseCarretRightIcon />,
        title: 'Creator tools',
        to: '/creatorTools',
    },
    {
        icon: <SquareAIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <CircleQuestionIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
];

const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
        case 'language':
            // handle change to language
            console.log(menuItem);
            break;
        default:
    }
};

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="TikTok" />
            </div>
            <Search />
            <div className={cx('actions')}>
                <Button primary>Log in</Button>
                <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                    <button className={cx('menu-btn')}>
                        <EllipsisVerticalIcon />
                    </button>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
