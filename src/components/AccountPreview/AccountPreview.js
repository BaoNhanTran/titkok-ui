import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TickIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Avatar from '~/components/Avatar';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ children, data, className }) {
    const handleResult = (attrs) => (
        <div className={cx('wrapper', className)} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('account-popper')}>
                <div className={cx('actions')}>
                    <Link className={cx('avatar')} to={`/profile/${data.nickname}`} target="_blank">
                        <Avatar width="44px" height="44px" src={data.avatar} alt={data.nickname} />
                    </Link>
                    <Button className={cx('follow-btn')} outline>
                        Follow
                    </Button>
                </div>
                <div className={cx('info')}>
                    <Link className={cx('nickname')} to={`/profile/${data.nickname}`} target="_blank">
                        <span>{data.nickname}</span>
                        {data.tick && (
                            <span className={cx('tick')}>
                                <TickIcon />
                            </span>
                        )}
                    </Link>
                    <br />
                    <Link
                        className={cx('name')}
                        to={`/profile/${data.nickname}`}
                        target="_blank"
                    >{`${data.first_name} ${data.last_name}`}</Link>
                </div>
                <div className={cx('interaction-count')}>
                    <span className={cx('count')}>{data.followers_count}</span>
                    <span className={cx('label')}>Followers</span>
                    <span className={cx('count')}>{data.likes_count}</span>
                    <span className={cx('label')}>Likes</span>
                </div>
                <p className={cx('bio')}>biography</p>
            </PopperWrapper>
        </div>
    );

    return (
        <div>
            <HeadlessTippy
                delay={[1000, 0]}
                placement="bottom-start"
                offset={[-8, 0]}
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
    className: PropTypes.string,
};

export default AccountPreview;
