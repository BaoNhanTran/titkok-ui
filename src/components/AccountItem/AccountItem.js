import { Link } from 'react-router-dom';
import { CircleCheckIcon } from '~/components/Icons';
import Avatar from '~/components/Avatar';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link className={cx('wrapper')} to={`/profile/${data.nickname}`}>
            <Avatar width="36px" height="40px" className={cx('avatar')} src={data.avatar} alt={data.nickname} />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <p>{data.nickname}</p>
                    {data.tick && <CircleCheckIcon className={cx('check')} />}
                </h4>
                <p className={cx('name')}>{data.full_name}</p>
            </div>
        </Link>
    );
}

export default AccountItem;
