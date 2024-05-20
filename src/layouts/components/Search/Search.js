import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { CircleNotchIcon, CircleXmarkIcon, MagnifyingGlassIcon } from '~/Icons';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <input placeholder="Search" />
            <CircleXmarkIcon className={cx('clear-btn')} />
            <CircleNotchIcon className={cx('loading')} />
            <span className={cx('separate')}></span>
            <button className={cx('search-btn')}>
                <MagnifyingGlassIcon />
            </button>
        </div>
    );
}

export default Search;
