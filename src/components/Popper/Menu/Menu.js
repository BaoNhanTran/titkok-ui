import HeadlessTippy from '@tippyjs/react/headless';
import { useSpring, animated } from '@react-spring/web';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { CaretUpIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
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
        api.start({
            ...initialStyles,
            config: { tension: 170 },
            onRest: unmount,
        });
    };

    return (
        <HeadlessTippy
            render={(attrs) => (
                <animated.div className={cx('menu-list')} style={props} tabIndex="-1" {...attrs}>
                    <div className={cx('arrow')}>
                        <CaretUpIcon />
                    </div>
                    <PoperWrapper className={cx('menu-popper')}>
                        {items.map((item, index) => (
                            <MenuItem key={index} data={item} />
                        ))}
                    </PoperWrapper>
                </animated.div>
            )}
            placement="bottom-end"
            interactive
            offset={[12, 4]}
            animation={true}
            onMount={handleMountTippy}
            onHide={handleHideTippy}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
