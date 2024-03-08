import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CheckIcon } from '~/components/Icons';
import Avatar from '~/components/Avatar';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link className={cx('wrapper')} to={`/profile/${data.nickname}`}>
            <Avatar
                width="36px"
                height="40px"
                className={cx('avatar')}
                src={data.avatar}
                alt={data.full_name}
                // fallback="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/ffb4569d107f2ce8c0bd01108d65678b~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1705276800&x-signature=OuTEmzv%2BS0Q0jZrxJkAjOBmoqQs%3D"
            />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <CheckIcon className={cx('check')} />}
                </h4>
                <p className={cx('name')}>{data.full_name}</p>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
