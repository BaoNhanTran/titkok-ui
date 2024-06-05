import Menu from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar-container')}>
                <Menu />
                <SuggestedAccounts title="Following accounts" />
            </div>
        </aside>
    );
}
export default Sidebar;
