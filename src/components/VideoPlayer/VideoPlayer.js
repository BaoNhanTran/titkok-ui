import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '~/components/Avatar';
import {
    BookmarkFillIcon,
    BubbleEllipsisRightFillIcon,
    HeartFillIcon,
    MusicIcon,
    PlayIcon,
    ShareFillIcon,
    TickIcon,
    VolumeXmarkIcon,
} from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';
import InteractionItem from './InteractionItem';
import Button from '../Button';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    const [isUnderline, setIsUnderline] = useState(false);
    const [showControlPanel, setShowControlPanel] = useState(false);
    const [showVolumeControl, setShowVolumeControl] = useState(false);

    const videoRef = useRef('');

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

    // Underline the nickname when hovering over the avatar
    const handleMouseEnterAvatar = () => {
        setIsUnderline(true);
    };

    const handleMouseLeaveAvatar = () => {
        setIsUnderline(false);
    };

    // Show control panel (action btn and control) when hovering over the video
    const handleMouseEnterVideo = () => {
        setShowControlPanel(true);
    };

    const handleMouseLeaveVideo = () => {
        setShowControlPanel(false);
    };

    // Show volume control when hovering over the volume btn
    const handleShowVolumeControl = () => {
        setShowVolumeControl(true);
    };

    return (
        <div className={cx('wrapper')}>
            <Link
                className={cx('avatar')}
                to={`/profile/${data.user.nickname}`}
                onMouseEnter={handleMouseEnterAvatar}
                onMouseLeave={handleMouseLeaveAvatar}
            >
                <Avatar width="56px" height="56px" src={data.user.avatar} alt={data.user.nickname} />
            </Link>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <Link className={cx('author-container')} to={`/profile/${data.user.nickname}`}>
                        <h3
                            className={cx('nickname', {
                                underline: isUnderline,
                            })}
                        >
                            {data.user.nickname}
                            {data.user.tick && (
                                <span className={cx('tick')}>
                                    <TickIcon />
                                </span>
                            )}
                        </h3>
                        <h4 className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </Link>
                    <Button className={cx('follow-btn')} outline>
                        Follow
                    </Button>
                    <p className={cx('desc')}>{data.description}</p>
                    <h4 className={cx('music-wrapper')}>
                        <Link className={cx('music-link')}>
                            <MusicIcon className={cx('music-icon')} />
                            <span className={cx('music-text')}>{data.music || 'Sound in video!'}</span>
                        </Link>
                    </h4>
                </div>
                <div className={cx('video-wrapper')}>
                    <div
                        className={cx('video-card')}
                        onMouseEnter={handleMouseEnterVideo}
                        onMouseLeave={handleMouseLeaveVideo}
                    >
                        <video className={cx('video')} src={data.file_url} autoPlay muted loop ref={videoRef}></video>
                        <div className={cx('action')}>
                            <div className={cx('action-btn', { show: showControlPanel })}>
                                <PlayIcon />
                            </div>
                            <div className={cx('volume-container')}>
                                <div
                                    className={cx('volume-control', {
                                        show: showVolumeControl,
                                    })}
                                >
                                    <input className={cx('volume-slider')} type="range" min="0" max="100" step="1" />
                                </div>
                                <div className={cx('volume-btn')} onMouseEnter={handleShowVolumeControl}>
                                    <VolumeXmarkIcon />
                                </div>
                            </div>
                        </div>
                        <div className={cx('control', { show: showControlPanel })}>
                            <div className={cx('slider')}>
                                <div className={cx('slider-track')}>
                                    <div className={cx('slider-fill')}></div>
                                    <div className={cx('slider-thumb')}></div>
                                </div>
                            </div>
                            <div className={cx('seekbar-time')}>00:30/01:42</div>
                        </div>
                    </div>
                    <div className={cx('interaction-count')}>
                        {interactionItems.map(({ icon, count }, index) => {
                            return <InteractionItem key={index} icon={icon} count={count} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

VideoPlayer.propTypes = {
    data: PropTypes.object.isRequired,
};

export default VideoPlayer;
