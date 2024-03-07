import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu from './Menu';
import SuggestedAccount from '~/components/SuggestedAccount/SuggestedAccount';
const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu />
            <SuggestedAccount title="Suggested accounts" />
        </aside>
    );
}

export default Sidebar;
