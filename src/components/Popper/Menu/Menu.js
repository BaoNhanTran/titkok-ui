import HeadlessTippy from '@tippyjs/react/headless';
import { useSpring, animated } from '@react-spring/web';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { CaretUpIcon } from '~/components/Icons';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, currentUser, offset, hideOnClick = false }) {
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
        <animated.div style={props} className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div
                    className={cx('arrow', {
                        login: currentUser,
                    })}
                >
                    <CaretUpIcon />
                </div>
                {history.length > 1 && <Header onBack={handleBack} title={current.title} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </animated.div>
    );

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    // use useSpring hook to create the fade out effect
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
    const handleHideTooltip = ({ unmount }) => {
        handleResetToFirstPage();
        api.start({
            ...initialStyles,
            onRest: unmount,
            config: { tension: 170, clamp: true },
        });
    };

    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            delay={[0, 700]}
            offset={offset}
            animation={true}
            onMount={handleMountTippy}
            onHide={handleHideTooltip}
            render={handleResult}
            hideOnClick={hideOnClick}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
