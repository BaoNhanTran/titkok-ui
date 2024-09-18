import { useEffect, useRef, useState } from 'react';
import * as searchService from '~/services/searchSevice';
import HeadlessTippy from '@tippyjs/react/headless';
import { CircleNotchIcon, CircleXmarkIcon, MagnifyingGlassIcon } from '~/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef('');

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue) {
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const res = await searchService.search(debouncedValue);
            setSearchResults(res);

            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        inputRef.current.focus();
        setSearchValue('');
    };

    return (
        // Interactive tippy element may not be accessible via keyboard navigation
        // because it is not directly after the reference element in the DOM source order.
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={!!debouncedValue && showResult}
                interactive
                offset={[0, 8]}
                onClickOutside={() => setShowResult(false)}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResults.map((result) => (
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
                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <CircleXmarkIcon />
                        </button>
                    )}
                    {loading && <CircleNotchIcon className={cx('loading')} />}
                    <span className={cx('separate')}></span>
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <MagnifyingGlassIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
