import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
    ArrowRightToBracketIcon,
    CircleQuestionIcon,
    CoinIcon,
    EllipsisVerticalIcon,
    GearIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    PaperPlaneIcon,
    PlusIcon,
    UserIcon,
} from '~/components/Icons';
import Search from '~/layouts/components/Search';
import Menu from '~/components/Popper/Menu';
import Avatar from '~/components/Avatar';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <CircleQuestionIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
    },
];

const userMenu = [
    {
        icon: <UserIcon />,
        title: 'View profile',
        to: '/profile/nhantran',
    },
    {
        icon: <CoinIcon />,
        title: 'Get Coins',
        to: '/coin',
    },
    {
        icon: <GearIcon />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <ArrowRightToBracketIcon />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

// Handle logic
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
    const currentUser = true;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <Link className={cx('logo')} to={config.routes.home}>
                    <img src={images.logo} alt="TikTok" />
                </Link>
            </div>
            <Search />
            <div className={cx('actions')}>
                <Button className={cx('upload-btn')} leftIcon={<PlusIcon />} primary>
                    Upload
                </Button>
                {currentUser ? (
                    <>
                        <div className={cx('message-parent')}>
                            <Tippy content="Messages" placement="bottom" interactive>
                                <button className={cx('actions-btn', 'message-btn')}>
                                    <PaperPlaneIcon />
                                </button>
                            </Tippy>
                        </div>
                        <div className={cx('inbox-parent')}>
                            <Tippy content="Inbox" placement="bottom" interactive>
                                <button className={cx('actions-btn')}>
                                    <InboxIcon />
                                    <sup className={cx('sup-badge')}>9</sup>
                                </button>
                            </Tippy>
                        </div>
                    </>
                ) : (
                    <Button primary>Log in</Button>
                )}
                <Menu
                    items={currentUser ? userMenu : MENU_ITEMS}
                    onChange={handleMenuChange}
                    currentUser={currentUser}
                    offset={currentUser ? [12, 12] : [12, 10]}
                >
                    {currentUser ? (
                        <Avatar
                            width="32px"
                            height="32px"
                            className={cx('user-avatar')}
                            src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/e5f5ca1a62de4e7a1c3653e048f4c479~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1711004400&x-signature=j4N3U53uaong%2FUdj1R6R30WgFAo%3D"
                            alt="nguyenvana"
                            // fallback="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/bf5ecfe37355084845d0c3a1fabd4687~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1711098000&x-signature=v9QlGfe2BsBbh6mxNbHAdwhHfIA%3D"
                        />
                    ) : (
                        <button className={cx('menu-btn')}>
                            <EllipsisVerticalIcon />
                        </button>
                    )}
                </Menu>
            </div>
        </header>
    );
}

export default Header;
