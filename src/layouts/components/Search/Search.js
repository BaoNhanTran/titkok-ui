import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import * as searchService from '~/service/searchService';
import { ClearIcon, LoadingIcon, SearchIcon } from '~/components/Icons';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef('');

    const debouncedValuve = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValuve) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const res = await searchService.search(debouncedValuve);
            setSearchResult(res);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValuve]);

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
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                interactive
                onClickOutside={handleHideResult}
                render={(attrs) => {
                    return (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <header className={cx('search-title')}>Accounts</header>
                                {searchResult.map((result) => {
                                    return <AccountItem key={result.id} data={result} />;
                                })}
                            </PopperWrapper>
                        </div>
                    );
                }}
            >
                <div className={cx('search')}>
                    <input
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value.trimStart());
                        }}
                        ref={inputRef}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />
                    {searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <ClearIcon />
                        </button>
                    )}
                    {loading && <LoadingIcon className={cx('loading')} />}
                    <span className={cx('separate')}></span>
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
