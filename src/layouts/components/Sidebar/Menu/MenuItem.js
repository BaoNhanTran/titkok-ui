import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ to, icon, activeIcon, title }) {
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
                    <span className={cx('icon')}>{isActive ? activeIcon : icon}</span>
                    <span className={cx('title')}>{title}</span>
                </>
            )}
        </NavLink>
    );
}

MenuItem.propTypes = {
    to: PropTypes.string,
    icon: PropTypes.node,
    activeIcon: PropTypes.node,
    title: PropTypes.string,
};

export default MenuItem;
