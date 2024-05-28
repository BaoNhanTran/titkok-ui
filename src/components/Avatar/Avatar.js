import { forwardRef } from 'react';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

const Avatar = forwardRef(({ width = '40px', height = '40px', className, ...props }, ref) => {
    const avatarSize = {
        width,
        height,
    };
    return <Image className={cx('wrapper', className)} style={avatarSize} ref={ref} {...props} />;
});

export default Avatar;
