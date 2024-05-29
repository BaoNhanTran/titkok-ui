import { useRef, useState, useEffect } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { CircleNotchIcon, CircleXmarkIcon, MagnifyingGlassIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import useDebounce from '~/hooks/useDebounce';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef('');

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        setTimeout(() => {
            if (!debouncedValue) {
                return;
            }

            setLoading(true);

            fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouncedValue)}&type=less`)
                .then((res) => res.json())
                .then((res) => {
                    setLoading(false);
                    setSearchResult(res.data);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }, 0);
    }, [debouncedValue]);

    const handleInput = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
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
                visible={debouncedValue && showResult}
                interactive
                placement="bottom"
                offset={[0, 8]}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
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
                        onFocus={() => setShowResult(true)}
                        ref={inputRef}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <CircleXmarkIcon />
                        </button>
                    )}
                    {loading && <CircleNotchIcon className={cx('loading')} />}
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
