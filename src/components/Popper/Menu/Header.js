import PropTypes from 'prop-types';
import { ChevronLeftIcon } from '~/Icons';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <div className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <ChevronLeftIcon />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func,
};

export default Header;
