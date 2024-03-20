import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { CaretUpIcon } from '~/components/Icons';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, currentUser, offset }) {
    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const handleMoveToNextPage = () => {
                const isParent = !!item.children;
                if (isParent) {
                    setHistory((prev) => [...prev, item.children]);
                } else {
                    onChange(item);
                }
            };

            return <MenuItem key={index} data={item} onClick={handleMoveToNextPage} />;
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, -1));
    };

    const handleResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div
                    className={cx('arrow', {
                        login: currentUser,
                    })}
                >
                    <CaretUpIcon />
                </div>
                {history.length > 1 && <Header onBack={handleBack} title={current.title} />}
                {renderItems()}
            </PopperWrapper>
        </div>
    );

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <HeadlessTippy
            visible
            interactive
            placement="bottom-end"
            delay={[0, 700]}
            offset={offset}
            onHide={handleResetToFirstPage}
            render={handleResult}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
