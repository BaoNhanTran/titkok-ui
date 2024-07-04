import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircleCheckIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Avatar from '~/components/Avatar';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ children, data }) {
    const handleResult = (attrs) => (
        <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('account-popper')}>
                <div className={cx('actions')}>
                    <Link className={cx('avatar')} to={`/profile/${data.user.nickname}`} target="_blank">
                        <Avatar width="44px" height="44px" src={data.user.avatar} alt={data.user.nickname} />
                    </Link>
                    <Button className={cx('follow-btn')} outline>
                        Follow
                    </Button>
                </div>
                <div className={cx('info')}>
                    <Link className={cx('nickname')} to={`/profile/${data.user.nickname}`} target="_blank">
                        <span>{data.user.nickname}</span>
                        {data.user.tick && (
                            <span className={cx('tick')}>
                                <CircleCheckIcon />
                            </span>
                        )}
                    </Link>
                    <br />
                    <Link
                        className={cx('name')}
                        to={`/profile/${data.user.nickname}`}
                        target="_blank"
                    >{`${data.user.first_name} ${data.user.last_name}`}</Link>
                </div>
                <div className={cx('interaction-count')}>
                    <span className={cx('count')}>{data.user.followers_count}</span>
                    <span className={cx('label')}>Followers</span>
                    <span className={cx('count')}>{data.user.likes_count}</span>
                    <span className={cx('label')}>Likes</span>
                </div>
                <p className={cx('bio')}>biography</p>
            </PopperWrapper>
        </div>
    );

    return (
        <div>
            <HeadlessTippy
                delay={[0, 1000]}
                placement="bottom-start"
                offset={[-12, 32]}
                interactive
                render={handleResult}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

AccountPreview.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
