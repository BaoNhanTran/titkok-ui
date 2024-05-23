import { images } from '~/assets';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import config from '~/config';
import {
    CircleKeyboardIcon,
    CircleQuestionIcon,
    EllipsisVerticalIcon,
    LanguageIcon,
    PlusIcon,
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
    },
    {
        icon: <CircleKeyboardIcon />,
        title: 'Keyboard shortcuts',
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
