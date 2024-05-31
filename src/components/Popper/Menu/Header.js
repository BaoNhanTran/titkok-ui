import PropTypes from 'prop-types';
import { ChevronLeftIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ onBack, title }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <ChevronLeftIcon />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}

Header.propTypes = {
    onBack: PropTypes.func,
    title: PropTypes.string,
};

export default Header;
