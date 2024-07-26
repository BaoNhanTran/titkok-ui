import { CircleNotchIcon, CircleXmarkIcon, MagnifyingGlassIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <form className={cx('search')}>
            <input placeholder="Search" />
            <CircleXmarkIcon className={cx('clear-btn')} />
            <CircleNotchIcon className={cx('loading')} />
            <span className={cx('separate')}></span>
            <button className={cx('search-btn')}>
                <MagnifyingGlassIcon />
            </button>
        </form>
    );
}

export default Search;
