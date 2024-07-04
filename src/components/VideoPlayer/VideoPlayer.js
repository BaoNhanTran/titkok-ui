import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import {
    BookmarkFillIcon,
    BubbleEllipsisRightFillIcon,
    CircleCheckIcon,
    HeartFillIcon,
    MusicIcon,
    PauseIcon,
    PlayIcon,
    ShareFillIcon,
    ThinPlusIcon,
    VolumeMediumIcon,
    VolumeXmarkIcon,
} from '../Icons';
import InteractionItem from './InteractionItem';
import AccountPreview from '~/components/AccountPreview';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentPercent, setCurrentPercent] = useState(0);
    const [volumeValue, setVolumeValue] = useState(0);

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
            count: data.shares_count,
        },
        {
            icon: <ShareFillIcon />,
            count: data.shares_count,
        },
    ];

    // Set 'isVideoPlaying' to true if the video is playing, or false if it is paused.
    const handleVideoPlayEvent = () => {
        setIsVideoPlaying(true);
    };

    const handleVideoPauseEvent = () => {
        setIsVideoPlaying(false);
    };

    // Toggle video play/pause on action button click.
    const toggleVideoPlay = () => {
        if (isVideoPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

    // Update the 'currentPercent' based on the video's current time
    const handleTimeUpdate = () => {
        setCurrentPercent((videoRef.current.currentTime / videoRef.current.duration) * 100);
    };

    // Seek the video to the specific time position
    const handleSeekVideo = (e) => {
        const seekTime = (e.target.value * videoRef.current.duration) / 100;
        videoRef.current.currentTime = seekTime;
    };

    // Toggle volume on/off on volume button click.
    const toggleMuted = () => {
        setIsMuted(!isMuted);
        if (isMuted) {
            setVolumeValue(20);
            videoRef.current.volume = 0.2;
        } else {
            setVolumeValue(0);
        }
    };

    // Adjust the volume of the video
    const handleAdjustVolume = (e) => {
        const volumeValue = e.target.value;
        setVolumeValue(volumeValue);
        videoRef.current.volume = volumeValue / 100;
        if (volumeValue === '0') {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('video-card')}>
                    <video
                        className={cx('video')}
                        src={data.file_url}
                        ref={videoRef}
                        onPlay={handleVideoPlayEvent}
                        onPause={handleVideoPauseEvent}
                        onTimeUpdate={handleTimeUpdate}
                        loop
                        muted={isMuted}
                        autoPlay
                    ></video>
                    <div className={cx('video-card-bottom')}>
                        <Link to={`/profile/${data.user.nickname}`}>
                            <h3 className={cx('nickname')}>
                                <p>{data.user.nickname}</p>
                                <span className={cx('tick')}>
                                    <CircleCheckIcon />
                                </span>
                            </h3>
                        </Link>
                        <div className={cx('desc')}>{data.description}</div>
                        <h4 className={cx('video-music')}>
                            <Link className={cx('music-link')}>
                                <MusicIcon className={cx('music-icon')} />
                                <span className={cx('music-text')}>{data.music || 'Sound in video!'}</span>
                            </Link>
                        </h4>
                        <div className={cx('action')}>
                            <div className={cx('action-btn')} onClick={toggleVideoPlay}>
                                {isVideoPlaying ? <PauseIcon /> : <PlayIcon />}
                            </div>
                            <div className={cx('slider-container')}>
                                <div className={cx('slider-wrapper')}>
                                    <input
                                        className={cx('slider')}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={currentPercent}
                                        onChange={handleSeekVideo}
                                    ></input>
                                    <div className={cx('slider-fill')} style={{ width: `${currentPercent}%` }}></div>
                                </div>
                            </div>
                            <div className={cx('volume-container')}>
                                <div className={cx('volume-control')}>
                                    <div className={cx('volume-slider-wrapper')}>
                                        <input
                                            className={cx('volume-slider')}
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={volumeValue}
                                            onChange={handleAdjustVolume}
                                        ></input>
                                        <div
                                            className={cx('volume-slider-fill')}
                                            style={{ width: `${volumeValue}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className={cx('volume-btn')} onClick={toggleMuted}>
                                    {isMuted ? <VolumeXmarkIcon /> : <VolumeMediumIcon />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('interaction')}>
                    <div className={cx('avatar-container')}>
                        <AccountPreview data={data}>
                            <Link className={cx('avatar')} to={`/profile/${data.nickname}`}>
                                <Avatar width="48px" height="48px" src={data.user.avatar} />
                            </Link>
                        </AccountPreview>
                        <button className={cx('avatar-follow-btn')}>
                            <ThinPlusIcon />
                        </button>
                    </div>
                    {interactionItems.map(({ icon, count }, index) => (
                        <InteractionItem key={index} icon={icon} count={count} />
                    ))}
                </div>
            </div>
        </div>
    );
}

VideoPlayer.propTypes = {
    data: PropTypes.object.isRequired,
};

export default VideoPlayer;
