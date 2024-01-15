import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { ClearIcon, LoadingIcon, SearchIcon } from '~/components/Icon';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef('');

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            visible={showResult && searchResult.length > 0 && searchValue}
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
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
