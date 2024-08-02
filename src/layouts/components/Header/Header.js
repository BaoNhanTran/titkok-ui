import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import {
    ArrowRightToBracketIcon,
    CircleQuestionIcon,
    CircleTikTokIcon,
    EllipsisVerticalIcon,
    GearIcon,
    HouseCaretRightIcon,
    InboxIcon,
    MoonIcon,
    PaperPlaneIcon,
    PlusIcon,
    SquareAIcon,
    UserIcon,
} from '~/components/Icons';
import Menu from '~/components/Popper/Menu';
import Avatar from '~/components/Avatar';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <HouseCaretRightIcon />,
        title: 'Creator tools',
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
    {
        icon: <MoonIcon />,
        title: 'Dark mode',
    },
];

const userMenu = [
    {
        icon: <UserIcon />,
        title: 'View profile',
        to: '/profile/nhantran',
    },
    {
        icon: <CircleTikTokIcon />,
        title: 'Get Coins',
        to: '/coins',
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

function Header() {
    const currentUser = true;
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handle change to language
                console.log(menuItem);
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="TikTok" />
            </div>
            <Search />
            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Button className={cx('upload-btn')} leftIcon={<PlusIcon />}>
                            Upload
                        </Button>
                        <Tippy content="Messages" interactive>
                            <button className={cx('action-btns', 'messages-btn')}>
                                <PaperPlaneIcon />
                                <sup className={cx('sup-badge')}>13</sup>
                            </button>
                        </Tippy>
                        <Tippy content="Inbox" interactive>
                            <button className={cx('action-btns')}>
                                <InboxIcon />
                                <sup className={cx('sup-badge')}>29</sup>
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <Button primary>Log in</Button>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <Avatar
                            className={cx('user-avatar')}
                            width="32px"
                            height="32px"
                            src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/9e05bfce01aec386ad106a70004c2ee8.jpeg?lk3s=a5d48078&nonce=26800&refresh_token=321156004e104529612ccb229b4405d8&x-expires=1722672000&x-signature=RusgtO5iN3nJzRqmbiIxMGQNmio%3D&shp=a5d48078&shcp=b59d6b55"
                            alt="nguyenvana"
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
