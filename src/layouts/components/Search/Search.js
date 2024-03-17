import HeadlessTippy from '@tippyjs/react/headless';
import { CircleXmarkIcon, MagnifyingGlassIcon, SpinnerIcon } from '~/components/Icons/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 0);
    }, []);

    return (
        <HeadlessTippy
            visible={searchResult.length > 0}
            interactive
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <header className={cx('search-title')}>Accounts</header>
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                    </PopperWrapper>
                </div>
            )}
        >
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
        </HeadlessTippy>
    );
}

export default Search;
