import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSpring, animated } from '@react-spring/web';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { CaretUpIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, currentUser, hideOnClick = true }) {
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
        <animated.div className={cx('menu-list')} style={props} tabIndex="-1" {...attrs}>
            <div
                className={cx('arrow', {
                    login: currentUser,
                })}
            >
                <CaretUpIcon />
            </div>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header onBack={handleBack} title={current.title} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </animated.div>
    );

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    // Use spring hook to create the fade out effect
    const initialStyles = {
        opacity: 0,
    };

    const [props, api] = useSpring(() => initialStyles);

    // Handle event when the tippy tooltip is mounted
    const handleMountTippy = () => {
        api.start({
            opacity: 1,
            config: { tension: 0 },
            onRest: () => {},
        });
    };

    // Handle event when the tippy tooltip is hide
    const handleHideTippy = ({ unmount }) => {
        handleResetToFirstPage();
        api.start({
            ...initialStyles,
            onRest: unmount,
            config: { tension: 170 },
        });
    };

    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            offset={[13, 12]}
            delay={[0, 700]}
            render={handleResult}
            animation={true}
            onMount={handleMountTippy}
            onHide={handleHideTippy}
            hideOnClick={hideOnClick}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
