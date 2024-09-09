import { CircleNotchIcon, CircleXmarkIcon, MagnifyingGlassIcon } from '~/Icons/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <form className={cx('search')}>
            <input placeholder="Search" />
            <button className={cx('clear-btn')}>
                <CircleXmarkIcon />
            </button>
            <CircleNotchIcon className={cx('loading')} />
            <span className={cx('separate')}></span>
            <button className={cx('search-btn')}>
                <MagnifyingGlassIcon />
            </button>
        </form>
    );
}

export default Search;
