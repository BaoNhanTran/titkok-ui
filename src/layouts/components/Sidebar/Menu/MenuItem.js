import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ to, title, icon, activeIcon }) {
    return (
        <NavLink
            className={({ isActive }) =>
                cx('menu-item', {
                    active: isActive,
                })
            }
            to={to}
        >
            {({ isActive }) => (
                <>
                    {isActive ? activeIcon : icon}
                    <span className={cx('title')}>{title}</span>
                </>
            )}
        </NavLink>
    );
}

MenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;
