import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { CheckIcon } from '~/components/Icons';
import AccountPreview from '~/components/AccountPreview';
import Avatar from '~/components/Avatar';
import classNames from 'classnames/bind';
import styles from './SuggestedAccount.module.scss';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('preview-popper')}>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        // Interactive tippy element may not be accessible via keyboard navigation
        // because it is not directly after the reference element in the DOM source order.
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            <HeadlessTippy render={renderPreview} interactive placement="bottom" offset={[0, 0]} delay={[800, 0]}>
                <Link className={cx('account-item')} to={`/profile/${data.nickname}`}>
                    <Avatar
                        className={cx('avatar')}
                        src={data.avatar}
                        alt={data.nickname}
                        // fallback="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/ffb4569d107f2ce8c0bd01108d65678b~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1705276800&x-signature=OuTEmzv%2BS0Q0jZrxJkAjOBmoqQs%3D"
                    />
                    <div className={cx('info')}>
                        <h4 className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <CheckIcon className={cx('check')} />}
                        </h4>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </Link>
            </HeadlessTippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
