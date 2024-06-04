import MenuItem from './MenuItem';
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
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu() {
    return (
        <nav className={cx('menu-list')}>
            <MenuItem to={config.routes.home} title="For You" icon={<HouseIcon />} activeIcon={<HouseActiveIcon />} />
            <MenuItem
                to={config.routes.following}
                title="Following"
                icon={<ArrowLeftToPersonIcon />}
                activeIcon={<ArrowLeftToPersonActiveIcon />}
            />
            <MenuItem
                to={config.routes.live}
                title="LIVE"
                icon={<VideoPlayIcon />}
                activeIcon={<VideoPlayActiveIcon />}
            />
        </nav>
    );
}

export default Menu;
