import { useState } from 'react';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSpring, animated } from '@react-spring/web';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { CaretUpIcon } from '~/Icons';
import Header from './Header';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, offsetX, hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }]);
    let menuLevel = `level-${history.length}`;
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

            return <MenuItem key={index} data={item} className={menuLevel} onClick={handleMoveToNextPage}></MenuItem>;
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, -1));
    };

    const handleResult = (attrs) => (
        <animated.div className={cx('menu-list')} tabIndex="-1" style={props} {...attrs}>
            <span className={cx('menu-arrow')}>
                <CaretUpIcon />
            </span>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </animated.div>
    );

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    // Use react spring to create the fade out effect
    const initialStyles = { opacity: 0 };
    const [props, api] = useSpring(() => initialStyles);

    const handleMountTippy = () => {
        api.start({
            opacity: 1,
            config: { tension: 0 },
            onRest: () => {},
        });
    };

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
            hideOnClick={hideOnClick}
            interactive
            placement="bottom-end"
            offset={[offsetX, 12]}
            delay={[0, 500]}
            onMount={handleMountTippy}
            onHide={handleHideTippy}
            animation={true}
            render={handleResult}
        >
            {children}
        </HeadlessTippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    offsetX: PropTypes.number,
    hideOnClick: PropTypes.bool,
};

export default Menu;
