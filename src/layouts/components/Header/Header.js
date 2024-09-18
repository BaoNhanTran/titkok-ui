import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import config from '~/config';
import {
    ArrowRightToBracketIcon,
    CircleQuestionIcon,
    CircleTikTokIcon,
    EllipsisVerticalIcon,
    GearIcon,
    HouseCarretRightIcon,
    InboxIcon,
    PaperPlaneIcon,
    PlusIcon,
    SquareAIcon,
    UserIcon,
} from '~/Icons';
import Menu from '~/components/Popper/Menu';
import Avatar from '~/components/Avatar';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const currentUser = true;

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

    const USER_ITEMS = [
        {
            icon: <UserIcon />,
            title: 'View profile',
            to: '/profile/nguyenvana',
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
                <Link to={config.routes.home}>
                    <img src={images.logo} alt="TikTok" />
                </Link>
            </div>
            <Search />
            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Button className={cx('upload-btn')} icon={<PlusIcon />}>
                            Upload
                        </Button>
                        {/* Interactive tippy element may not be accessible via keyboard navigation
                            because it is not directly after the reference element in the DOM source order.
                            Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
                        <div className={cx('action-btns-wrapper')}>
                            <Tippy content="Messages" interactive>
                                <button className={cx('action-btns', 'messages-btn')}>
                                    <PaperPlaneIcon />
                                    <sup className={cx('sup-badge')}>1</sup>
                                </button>
                            </Tippy>
                        </div>
                        <div className={cx('action-btns-wrapper')}>
                            <Tippy content="Inbox" interactive>
                                <button className={cx('action-btns')}>
                                    <InboxIcon />
                                    <sup className={cx('sup-badge')}>32</sup>
                                </button>
                            </Tippy>
                        </div>
                    </>
                ) : (
                    <Button primary>Log in</Button>
                )}
                <Menu
                    items={currentUser ? USER_ITEMS : MENU_ITEMS}
                    onChange={handleMenuChange}
                    offsetX={currentUser ? 10 : 12}
                >
                    {currentUser ? (
                        <Avatar
                            width="32px"
                            height="32px"
                            className={cx('user-avatar')}
                            src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/84a0290f5ea32d59533e37d1a6482ddf.jpeg?lk3s=a5d48078&nonce=88973&refresh_token=55325bcb323217f44f42e959c519cb6e&x-expires=1726477200&x-signature=En2y2hs99eIcsGb20%2Bnv2SLo8iE%3D&shp=a5d48078&shcp=b59d6b55"
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
