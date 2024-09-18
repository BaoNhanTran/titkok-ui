import PropTypes from 'prop-types';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ className, data, onClick }) {
    const classes = cx('menu-item', {
        [className]: !!className,
        separate: data.separate,
    });

    return (
        <Button className={classes} to={data.to} icon={data.icon} onClick={onClick}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
