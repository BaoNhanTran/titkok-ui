import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSpring, animated } from '@react-spring/web';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { CaretUpIcon } from '~/components/Icons';
import Header from './Header';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, hideOnClick = true }) {
    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            const handleMoveToNextPage = () => {
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

    const handleResults = (attrs) => (
        <animated.div className={cx('menu-list')} style={props} tabIndex="-1" {...attrs}>
            <div className={cx('arrow')}>
                <CaretUpIcon />
            </div>
            <PoperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PoperWrapper>
        </animated.div>
    );

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    // Use react spring to create the fade out effect
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
            config: { tension: 170 },
            onRest: unmount,
        });
    };

    return (
        <HeadlessTippy
            render={handleResults}
            placement="bottom-end"
            interactive
            offset={[12, 12]}
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
