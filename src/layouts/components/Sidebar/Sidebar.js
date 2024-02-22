import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu from './Menu';
const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu />
        </aside>
    );
}

export default Sidebar;
