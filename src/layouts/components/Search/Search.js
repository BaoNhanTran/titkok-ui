import HeadlessTippy from '@tippyjs/react/headless';
import { CircleNotchIcon, CircleXmarkIcon, MagnifyingGlassIcon } from '~/Icons/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        // Interactive tippy element may not be accessible via keyboard navigation
        // because it is not directly after the reference element in the DOM source order.
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible
                interactive
                offset={[0, 8]}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
                    </div>
                )}
            >
                <form className={cx('search')}>
                    <input placeholder="Search" />
                    <button className={cx('clear-btn')}>
                        <CircleXmarkIcon />
                    </button>
                    <CircleNotchIcon className={cx('loading')} />
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
