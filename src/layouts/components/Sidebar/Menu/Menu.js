import MenuItem from './MenuItem';
import {
    ArrowLeftToPersonActiveIcon,
    ArrowLeftToPersonIcon,
    HomeActiveIcon,
    HomeIcon,
    VideoPlayActiveIcon,
    VideoPlayIcon,
} from '~/components/Icons';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu() {
    return (
        <nav className={cx('menu-list')}>
            <MenuItem to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} title="For You" />
            <MenuItem
                to={config.routes.following}
                icon={<ArrowLeftToPersonIcon />}
                activeIcon={<ArrowLeftToPersonActiveIcon />}
                title="Following"
            />
            <MenuItem
                to={config.routes.live}
                icon={<VideoPlayIcon />}
                activeIcon={<VideoPlayActiveIcon />}
                title="LIVE"
            />
        </nav>
    );
}

export default Menu;
