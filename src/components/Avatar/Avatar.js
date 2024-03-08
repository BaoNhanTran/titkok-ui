import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
const cx = classNames.bind(styles);

const Avatar = forwardRef(({ width = '32px', height = '32px', className, src, alt, ...props }, ref) => {
    const avatarSize = {
        width,
        height,
    };
    return <Image className={cx('wrapper', className)} src={src} alt={alt} style={avatarSize} {...props} ref={ref} />;
});

Avatar.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default Avatar;
