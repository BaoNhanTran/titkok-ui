import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
const cx = classNames.bind(styles);

const Image = forwardRef(({ className, src, alt, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    return (
        <img
            className={cx('wrapper', className)}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={() => {
                setFallback(customFallback);
            }}
            ref={ref}
        />
    );
});

export default Image;
