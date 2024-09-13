import HeadlessTippy from '@tippyjs/react/headless';
import { useSpring, animated } from '@react-spring/web';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { CaretUpIcon } from '~/Icons/Icons';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item}></MenuItem>);
    };

    const handleResult = (attrs) => (
        <animated.div className={cx('menu-list')} tabIndex="-1" style={props} {...attrs}>
            <span className={cx('menu-arrow')}>
                <CaretUpIcon />
            </span>
            <PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
        </animated.div>
    );

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
        api.start({
            ...initialStyles,
            config: { tension: 170 },
            onRest: unmount,
        });
    };

    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            offset={[13, 4]}
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

export default Menu;
