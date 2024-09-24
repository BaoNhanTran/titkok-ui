import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '~/components/Avatar';
import {
    BookmarkFillIcon,
    BubbleEllipsisRightFillIcon,
    CheckIcon,
    CircleCheckIcon,
    EllipsisIcon,
    HeartFillIcon,
    LargeToSmallRectangleIcon,
    MusicIcon,
    ShareFillIcon,
    ThinPlusIcon,
    VolumeXmarkIcon,
} from '~/Icons';
import InteractionItem from './InteractionItem';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const interactionItems = [
        {
            icon: <HeartFillIcon />,
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
        <div className={cx('video-container')}>
            <div className={cx('video-card')}>
                <video className={cx('video')} src={data.file_url} autoPlay muted />
                <div className={cx('video-card-top')}>
                    <div className={cx('top-left')}>
                        <button className={cx('top-btns')}>
                            <LargeToSmallRectangleIcon />
                        </button>
                        <div className={cx('volume-container')}>
                            <button className={cx('top-btns')}>
                                <VolumeXmarkIcon />
                            </button>
                            <div className={cx('volume-slider-wrapper')}>
                                <input className={cx('volume-slider')} type="range" min="0" max="100" step="1" />
                            </div>
                        </div>
                    </div>
                    <div className="top-right">
                        <button className={cx('top-btns')}>
                            <EllipsisIcon />
                        </button>
                    </div>
                </div>
                <div className={cx('video-card-bottom')}>
                    <h3 className={cx('nickname')}>
                        <Link to={`/profile/${data.nickname}`}>{data.user.nickname}</Link>
                        {data.user.tick && <CircleCheckIcon className={cx('tick')} />}
                    </h3>
                    <div className={cx('desc-container', { expanded: isExpanded })}>
                        <p className={cx('desc', { expanded: isExpanded })}>{data.description}</p>
                        {/* <p className={cx('desc', { expanded: isExpanded })}>
                            Successful leaders and entrepreneurs are valuable sources of motivation.
                        </p> */}
                        <button
                            className={cx('expand-btn', { expanded: isExpanded })}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'less' : 'more'}
                        </button>
                    </div>
                    <div className={cx('music')}>
                        <MusicIcon className={cx('music-icon')} />
                        <h4 className={cx('music-text')}>{data.music || 'Music in video!'}</h4>
                    </div>
                </div>
                <div className={cx('slider-container')}>
                    <input className={cx('slider')} type="range" min="0" max="100" step="1" />
                </div>
            </div>
            <div className={cx('interaction')}>
                <div className={cx('avatar-container')}>
                    <Avatar className={cx('avatar')} width="48px" height="48px" src={data.user.avatar} />
                    <button
                        className={cx('follow-btn', {
                            followed: isFollowed,
                        })}
                        onClick={() => setIsFollowed(!isFollowed)}
                    >
                        {isFollowed ? <CheckIcon /> : <ThinPlusIcon />}
                    </button>
                </div>
                {interactionItems.map((item, index) => (
                    <InteractionItem key={index} data={item} />
                ))}
            </div>
        </div>
    );
}

VideoPlayer.propTypes = {
    data: PropTypes.object.isRequired,
};

export default VideoPlayer;
