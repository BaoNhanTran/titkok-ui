import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import {
    ClearIcon,
    CoinIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LoadingIcon,
    MenuIcon,
    MessageIcon,
    PlusIcon,
    QuestionIcon,
    SearchIcon,
    SettingIcon,
    UserIcon,
    LogoutIcon,
} from '~/components/Icon';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '~/components/Image';
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
        icon: <QuestionIcon />,
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
        to: '/profile',
    },
    {
        icon: <CoinIcon />,
        title: 'Get Coins',
        to: '/coin',
    },
    {
        icon: <SettingIcon />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <LogoutIcon />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handle change to language
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="Tittok" />
            </div>
            <HeadlessTippy
                visible={searchResult.length > 0}
                interactive
                render={(attrs) => {
                    return (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <header className={cx('search-title')}>Accounts</header>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    );
                }}
            >
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
            </HeadlessTippy>
            <div className={cx('actions')}>
                <Button className={cx('upload-btn')} leftIcon={<PlusIcon />}>
                    Upload
                </Button>
                {currentUser ? (
                    <>
                        <Tippy content="Messages" delay={[0, 50]}>
                            <button className={cx('actions-btn', 'message-btn')}>
                                <MessageIcon />
                            </button>
                        </Tippy>
                        <Tippy content="inbox" delay={[0, 50]}>
                            <button className={cx('actions-btn')}>
                                <InboxIcon />
                                <sup className={cx('sup-badge')}>12</sup>
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <Button primary>log in</Button>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <Image
                            className={cx('user-avatar')}
                            src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/171185fb90d061a594e4589894f2889c~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1705413600&x-signature=i%2F2hQsKtI4ZJF69TXFQ49%2BK4rXU%3D"
                            alt="Nguyen Van A"
                        />
                    ) : (
                        <button className={cx('menu-btn')}>
                            <MenuIcon />
                        </button>
                    )}
                </Menu>
            </div>
        </header>
    );
}

export default Header;
