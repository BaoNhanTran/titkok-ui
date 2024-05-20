import HeadlessTippy from '@tippyjs/react/headless';
import { CircleNotchIcon, CircleXmarkIcon, MagnifyingGlassIcon } from '~/components/Icons';
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
                interactive
                visible
                placement="bottom"
                offset={[0, 8]}
            >
                <div className={cx('search')}>
                    <input placeholder="Search" />
                    <CircleXmarkIcon className={cx('clear-btn')} />
                    <CircleNotchIcon className={cx('loading')} />
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
