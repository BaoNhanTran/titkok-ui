import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircleCheckIcon } from '~/components/Icons';
import Avatar from '~/components/Avatar';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link className={cx('account-item')} to={`/profile/${data.nickname}`}>
            <Avatar width="32px" height="32px" className={cx('avatar')} src={data.avatar} alt={data.nickname} />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <p>{data.nickname}</p>
                    {data.tick && <CircleCheckIcon className={cx('check')} />}
                </h4>
                <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
