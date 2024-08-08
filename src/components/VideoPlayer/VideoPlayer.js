import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BookmarkFillIcon,
    BubbleEllipsisRightFillIcon,
    CircleCheckIcon,
    HeartIcon,
    MusicIcon,
    PlayIcon,
    ShareFillIcon,
    ThinCheckIcon,
    ThinPlusIcon,
    VolumeXmarkIcon,
} from '~/components/Icons';
import Avatar from '~/components/Avatar';
import InteractionItem from './InteractionItem';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    const [isFollowed, setIsFollowed] = useState(false);

    const interactionItems = [
        {
            icon: <HeartIcon />,
            count: data.likes_count,
        },
        {
            icon: <BubbleEllipsisRightFillIcon />,
            count: data.comments_count,
        },
        {
            icon: <BookmarkFillIcon />,
            count: data.views_count,
        },
        {
            icon: <ShareFillIcon />,
            count: data.shares_count,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('video-card')}>
                    <video className={cx('video')} src={data.file_url} autoPlay muted></video>
                    <div className={cx('video-card-bottom')}>
                        <div className={cx('info')}>
                            <Link to={`/profile/${data.user.nickname}`} className={cx('author-container')}>
                                <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                                {data.user.tick && (
                                    <span className={cx('tick')}>
                                        <CircleCheckIcon />
                                    </span>
                                )}
                            </Link>
                            <p className={cx('video-desc')}>{data.description}</p>
                            <h4 className={cx('video-music')}>
                                <MusicIcon className={cx('music-icon')} />
                                <p className={cx('music-text')}>{data.music || 'Music in video!'}</p>
                            </h4>
                        </div>
                        <div className={cx('action')}>
                            <button className={cx('action-btn')} onClick={() => alert('Clicked!')}>
                                <PlayIcon />
                            </button>
                            <div className={cx('slider-container')}>
                                <input className={cx('slider')} type="range" min="0" max="100" step="1" />
                            </div>
                            <div className={cx('volume-container')}>
                                <button className={cx('volume-btn')}>
                                    <VolumeXmarkIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('interaction')}>
                    <span className={cx('avatar-container')}>
                        <Avatar
                            className={cx('avatar')}
                            width="48px"
                            height="48px"
                            src={data.user.avatar}
                            alt={data.user.nickname}
                        />
                        <button
                            className={cx('avatar-follow-btn', {
                                followed: isFollowed,
                            })}
                            onClick={() => setIsFollowed(!isFollowed)}
                        >
                            {isFollowed ? <ThinCheckIcon /> : <ThinPlusIcon />}
                        </button>
                    </span>
                    {interactionItems.map(({ icon, count }, index) => (
                        <InteractionItem key={index} icon={icon} count={count} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
