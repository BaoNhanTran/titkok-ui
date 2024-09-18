import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '~/components/Avatar';
import { CircleCheckIcon } from '~/Icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link className={cx('wrapper')} to={`/profile/${data.nickname}`}>
            <Avatar width="36px" height="40px" className={cx('avatar')} src={data.avatar} alt="nguyenvana" />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <p>{data.nickname}</p>
                    {data.tick && <CircleCheckIcon className={cx('tick')} />}
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
