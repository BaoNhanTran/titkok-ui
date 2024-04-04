import Menu from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar-container')}>
                <Menu />
                <SuggestedAccounts title="Suggested accounts" />
            </div>
        </aside>
    );
}

export default Sidebar;
