import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ className, data, onClick }) {
    return (
        <Button className={cx('menu-item', className)} to={data.to} icon={data.icon} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
