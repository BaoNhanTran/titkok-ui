import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import images from '~/assets/images';
import { ClearIcon, LoadingIcon, PlusIcon, SearchIcon } from '~/components/Icon';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="Tittok" />
            </div>
            <HeadlessTippy
                visible={searchResult.length > 0}
                interactive
                render={(attrs) => {
                    return (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <header className={cx('search-title')}>Accounts</header>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    );
                }}
            >
                <div className={cx('search')}>
                    <input placeholder="Search" />
                    <div className={cx('icon-wrapper')}>
                        <ClearIcon className={cx('clear-btn')} />
                        <LoadingIcon className={cx('loading')} />
                    </div>
                    <span className={cx('separate')}></span>
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
            <div className={cx('actions')}>
                <Button className={cx('upload-btn')} leftIcon={<PlusIcon />}>
                    Upload
                </Button>
                <Button primary>log in</Button>
            </div>
        </header>
    );
}

export default Header;
