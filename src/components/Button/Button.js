import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    href,
    to,
    primary = false,
    outline = false,
    disabled = false,
    leftIcon,
    RightIcon,
    className,
    children,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        ...passProps,
    };

    if (href) {
        props.href = href;
        Comp = 'a';
    } else if (to) {
        props.to = to;
        Comp = Link;
    }

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: !!className,
        primary,
        outline,
        disabled,
    });

    return (
        <Comp className={classes} {...props}>
            <span className={cx('icon')}>{leftIcon}</span>
            <span className={cx('title')}>{children}</span>
            <span className={cx('icon')}>{RightIcon}</span>
        </Comp>
    );
}

export default Button;
