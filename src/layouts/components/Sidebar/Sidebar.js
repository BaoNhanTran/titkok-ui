import Menu from './Menu';
import {
    ArrowLeftToPersonActiveIcon,
    ArrowLeftToPersonIcon,
    HouseActiveIcon,
    HouseIcon,
    VideoPlayActiveIcon,
    VideoPlayIcon,
} from '~/components/Icons';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <HouseIcon />,
        activeIcon: <HouseActiveIcon />,
        title: 'For You',
        to: config.routes.home,
    },
    {
        icon: <ArrowLeftToPersonIcon />,
        activeIcon: <ArrowLeftToPersonActiveIcon />,
        title: 'Following',
        to: config.routes.following,
    },
    {
        icon: <VideoPlayIcon />,
        activeIcon: <VideoPlayActiveIcon />,
        title: 'LIVE',
        to: config.routes.live,
    },
];

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar-container')}>
                <Menu items={MENU_ITEMS} />
            </div>
        </aside>
    );
}

export default Sidebar;
