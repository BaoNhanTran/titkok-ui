import { CircleXmarkIcon, MagnifyingGlassIcon, SpinnerIcon } from '~/components/Icons/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <input placeholder="Search" />
            <button className={cx('clear')}>
                <CircleXmarkIcon />
            </button>
            <SpinnerIcon className={cx('loading')} />
            <span className={cx('separate')}></span>
            <button className={cx('search-btn')}>
                <MagnifyingGlassIcon />
            </button>
        </div>
    );
}

export default Search;
