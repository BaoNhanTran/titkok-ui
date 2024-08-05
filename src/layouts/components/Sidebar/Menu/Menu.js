import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ items = [] }) {
    return (
        <nav className={cx('menu-list')}>
            {items.map((item, index) => (
                <MenuItem key={index} data={item} />
            ))}
        </nav>
    );
}

Menu.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Menu;
