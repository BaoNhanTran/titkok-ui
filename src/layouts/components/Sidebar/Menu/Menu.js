import MenuItem from './MenuItem';
import config from '~/config';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserArrowActiveIcon,
    UserArrowIcon,
} from '~/components/Icons';

function Menu() {
    return (
        <nav>
            <MenuItem to={config.routes.home} title="For You" icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
            <MenuItem
                to={config.routes.following}
                title="Following"
                icon={<UserArrowIcon />}
                activeIcon={<UserArrowActiveIcon />}
            />
            <MenuItem to={config.routes.live} title="LIVE" icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
        </nav>
    );
}

export default Menu;
