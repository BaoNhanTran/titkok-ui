import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { CircleXmarkIcon, MagnifyingGlassIcon, SpinnerIcon } from '~/components/Icons/Icons';
import AccountItem from '~/components/AccountItem';
import useDebouce from '~/hooks/useDebounce';
import * as searchService from '~/services/searchService';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef('');

    const debouncedValue = useDebouce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const res = await searchService.search(debouncedValue);
            setSearchResult(res);

            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleInput = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        // Interactive tippy element may not be accessible via keyboard navigation
        // because it is not directly after the reference element in the DOM source order.
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={searchResult.length > 0 && showResult}
                interactive
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <header className={cx('search-title')}>Accounts</header>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInput}
                        ref={inputRef}
                        onFocus={() => setShowResult(true)}
                    />
                    {searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <CircleXmarkIcon />
                        </button>
                    )}
                    {loading && <SpinnerIcon className={cx('loading')} />}
                    <span className={cx('separate')}></span>
                    <button className={cx('search-btn')}>
                        <MagnifyingGlassIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
