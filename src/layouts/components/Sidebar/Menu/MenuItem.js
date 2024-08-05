import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (
        <NavLink to={data.to} className={({ isActive }) => cx('menu-item', { active: isActive })}>
            {({ isActive }) => (
                <>
                    <span className={cx('icon')}>{isActive ? data.activeIcon : data.icon}</span>
                    <span className={cx('title')}>{data.title}</span>
                </>
            )}
        </NavLink>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MenuItem;
