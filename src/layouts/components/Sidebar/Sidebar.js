import config from '~/config';
import {
    HouseFillIcon,
    HouseIcon,
    PersonArrowLeftFillIcon,
    PersonArrowLeftIcon,
    VideoPlayFillIcon,
    VideoPlayIcon,
} from '~/Icons';
import Menu from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const MENU_ITEMS = [
        {
            icon: <HouseIcon />,
            activeIcon: <HouseFillIcon />,
            title: 'For You',
            to: config.routes.home,
        },
        {
            icon: <PersonArrowLeftIcon />,
            activeIcon: <PersonArrowLeftFillIcon />,
            title: 'Following',
            to: config.routes.following,
        },
        {
            icon: <VideoPlayIcon />,
            activeIcon: <VideoPlayFillIcon />,
            title: 'LIVE',
            to: config.routes.live,
        },
    ];

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar-container')}>
                <Menu items={MENU_ITEMS} />
                <SuggestedAccounts />
            </div>
        </aside>
    );
}

export default Sidebar;
