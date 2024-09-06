import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import Avatar from '~/components/Avatar';
import { CircleCheckIcon } from '~/components/Icons';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ data, children }) {
    return (
        // Interactive tippy element may not be accessible via keyboard navigation
        // because it is not directly after the reference element in the DOM source order.
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                placement="bottom-start"
                offset={[-12, 24]}
                interactive
                delay={[700, 700]}
                render={(attrs) => (
                    <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                        <div className={cx('head-container')}>
                            <Link to={`/profile/${data.user.nickname}`} target="_blank">
                                <Avatar
                                    className={cx('avatar')}
                                    width="44px"
                                    height="44px"
                                    src={data.user.avatar}
                                    alt={data.user.nickname}
                                />
                            </Link>
                            <Button className={cx('follow-btn')} outline>
                                Follow
                            </Button>
                        </div>
                        <div className={cx('info')}>
                            <Link to={`/profile/${data.user.nickname}`} target="_blank">
                                <h4 className={cx('nickname')}>
                                    <p>{data.user.nickname}</p>
                                    {data.user.tick && <CircleCheckIcon className={cx('tick')} />}
                                </h4>
                                <p className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</p>
                            </Link>
                            <div className={cx('user-stat')}>
                                <strong className={cx('count')}>{data.user.followers_count}</strong>
                                <span className={cx('label')}>Follower</span>
                                <strong className={cx('count')}>{data.user.likes_count}</strong>
                                <span className={cx('label')}>Thích</span>
                            </div>
                        </div>
                        <div className={cx('signature')}>Biography!!!</div>
                    </div>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

export default AccountPreview;
