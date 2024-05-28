import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { images } from '~/assets';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import config from '~/config';
import Avatar from '~/components/Avatar';
import {
    ArrowRightToBracketIcon,
    CircleKeyboardIcon,
    CircleQuestionIcon,
    CoinIcon,
    EllipsisVerticalIcon,
    GearIcon,
    InboxIcon,
    LanguageIcon,
    PaperPlaneIcon,
    PlusIcon,
    UserIcon,
} from '~/components/Icons';
import { Menu } from '~/components/Popper';
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
        icon: <CircleKeyboardIcon />,
        title: 'Keyboard shortcuts',
    },
];

const userMenu = [
    {
        icon: <UserIcon />,
        title: 'View profile',
        to: config.routes.profile,
    },
    {
        icon: <CoinIcon />,
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
            <div className={cx('logo')}>
                <img src={images.logo} alt="TikTok" />
            </div>
            <Search />
            <div className={cx('action')}>
                <Button className={cx('upload-btn')} leftIcon={<PlusIcon />} outline to={config.routes.upload}>
                    Upload
                </Button>
                {currentUser ? (
                    // Interactive tippy element may not be accessible via keyboard navigation
                    // because it is not directly after the reference element in the DOM source order.
                    // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
                    <>
                        <div className={cx('action-btns-parent')}>
                            <Tippy content="Messages" interactive>
                                <button className={cx('action-btns', 'messages-btn')}>
                                    <PaperPlaneIcon />
                                    <sup className={cx('sup-badge')}>1</sup>
                                </button>
                            </Tippy>
                        </div>
                        <div className={cx('action-btns-parent')}>
                            <Tippy content="Inbox" interactive>
                                <button className={cx('action-btns')}>
                                    <InboxIcon />
                                    <sup className={cx('sup-badge')}>13</sup>
                                </button>
                            </Tippy>
                        </div>
                    </>
                ) : (
                    <Button primary>Log in</Button>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange} currentUser={currentUser}>
                    {currentUser ? (
                        <Avatar
                            width="32px"
                            height="32px"
                            className={cx('user-avatar')}
                            src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/cee499efe145887b5d91a72037ede97f.jpeg?lk3s=a5d48078&nonce=89887&refresh_token=c6efa24c679f95fcd56bb152e91128f3&x-expires=1716854400&x-signature=7RzJoIk6AnNsgZkxuNFW%2FGBTzc8%3D&shp=a5d48078&shcp=81f88b70"
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
