import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

const Avatar = forwardRef(({ className, width = '40px', height = '40px', ...props }, ref) => {
    const avatarSize = {
        width,
        height,
    };

    return <Image className={cx('wrapper', className)} style={avatarSize} ref={ref} {...props} />;
});

Avatar.propTypes = {
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default Avatar;
