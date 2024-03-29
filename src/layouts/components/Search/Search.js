import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { CircleXmarkIcon, MagnifyingGlassIcon, SpinnerIcon } from '~/components/Icons/Icons';
import AccountItem from '~/components/AccountItem';
import useDebouce from '~/hooks/useDebounce';
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
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouncedValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
                setSearchResult(res.data);
            })
            .catch(() => {
                setLoading(false);
            });
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
        <HeadlessTippy
            visible={debouncedValue && showResult}
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
    );
}

export default Search;
