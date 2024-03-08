import PropTypes from 'prop-types';
import { CheckIcon } from '~/components/Icons';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Avatar from '~/components/Avatar';
const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions')}>
                <Avatar
                    width="44px"
                    height="44px"
                    className={cx('avatar')}
                    src={data.avatar}
                    alt={data.full_name}
                    // fallback="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/ffb4569d107f2ce8c0bd01108d65678b~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1705276800&x-signature=OuTEmzv%2BS0Q0jZrxJkAjOBmoqQs%3D"
                />
                <Button className={cx('follow-btn')} outline to={`/profile/${data.nickname}`}>
                    Follow
                </Button>
            </div>
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <CheckIcon className={cx('check')} />}
                </h4>
                <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
            </div>
            <div className={cx('interaction-counts')}>
                <strong className={cx('count')}>{data.followers_count}</strong>
                <span className={cx('label')}>Followers</span>
                <strong className={cx('count')}>{data.likes_count}</strong>
                <span className={cx('label')}>Likes</span>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
