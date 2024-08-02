import { useEffect, useRef, useState } from 'react';
import { CircleNotchIcon, CircleXmarkIcon, MagnifyingGlassIcon } from '~/components/Icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef('');

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounceValue) {
            return;
        }

        setTimeout(() => {
            setLoading(true);
            fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounceValue)}&type=less`)
                .then((res) => res.json())
                .then((res) => {
                    setLoading(false);
                    setSearchResults(res.data);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }, 0);
    }, [debounceValue]);

    const handleInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
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
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PoperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResults.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PoperWrapper>
                    </div>
                )}
                visible={debounceValue && showResult}
                interactive
                offset={[0, 8]}
                placement="bottom"
                onClickOutside={handleHideResult}
            >
                <form className={cx('search')}>
                    <input
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInput}
                        onFocus={(e) => setShowResult(true)}
                        ref={inputRef}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <CircleXmarkIcon />
                        </button>
                    )}
                    {!!loading && <CircleNotchIcon className={cx('loading')} />}
                    <span className={cx('separate')}></span>
                    <button className={cx('search-btn')}>
                        <MagnifyingGlassIcon />
                    </button>
                </form>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
