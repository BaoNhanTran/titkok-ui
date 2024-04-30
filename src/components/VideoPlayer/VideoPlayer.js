import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '~/components/Avatar';
import {
    BookmarkFillIcon,
    BubbleEllipsisRightFillIcon,
    HeartFillIcon,
    MusicIcon,
    PauseIcon,
    PlayIcon,
    ShareFillIcon,
    TickIcon,
    VolumeMediumIcon,
    VolumeXmarkIcon,
} from '~/components/Icons';
import Button from '../Button';
import InteractionItem from './InteractionItem';
import AccountPreview from '~/components/AccountPreview';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    const [isUnderline, setIsUnderline] = useState(false);
    const [showControlPanel, setShowControlPanel] = useState(false);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentPercent, setCurrentPercent] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [volumeValue, setVolumeValue] = useState(0);
    const [isActionClicked, setIsActionClicked] = useState(false);

    const videoRef = useRef('');
    const videoCardRef = useRef('');

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

    // Show the control panel (action btn, volume btn and control) when hovering over the video
    const handleMouseEnterVideo = () => {
        setShowControlPanel(true);
    };

    const handleMouseLeaveVideo = () => {
        setShowControlPanel(false);
    };

    // Show the control panel (action btn, volume btn and control) based on the value of 'isActionClicked'
    const handlePlayBtnClick = () => {
        toggleVideoPlay();
        setIsActionClicked(true);
        // console.log('----------------------------------------------------------------');
        // console.log('play btn clicked');
        // console.log('isActionClicked:', isActionClicked);
    };

    const handleVolumeBtnClick = () => {
        toggleMuted();
        setIsActionClicked(true);
        // console.log('----------------------------------------------------------------');
        // console.log('volume btn clicked');
        // console.log('isActionClicked:', isActionClicked);
    };

    // Set the value of 'isActionClicked' to false when clicking outside of the video card element
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (videoCardRef.current && !videoCardRef.current.contains(e.target)) {
                setIsActionClicked(false);
                // console.log('click inside video card, isActionClicked:', isActionClicked);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [videoCardRef]);

    // Show volume control when hovering over the volume btn
    const handleShowVolumeControl = () => {
        setShowVolumeControl(true);
    };

    const handleHideVolumeControl = () => {
        setShowVolumeControl(false);
    };

    // Set the state of 'isVideoPlaying' to true or false depending on whether the video is playing or paused
    const handleVideoPlayEvent = () => {
        setIsVideoPlaying(true);
    };

    const handleVideoPauseEvent = () => {
        setIsVideoPlaying(false);
    };

    // Toggle Play or pause for the video based on the value of 'isVideoPlaying'
    const toggleVideoPlay = () => {
        if (isVideoPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

    // Update the 'currentPercent' value according to the current time of the video
    const handleTimeUpdate = () => {
        setCurrentPercent(Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100));
    };

    // Seek the video to a specific time position
    const handleSeekVideo = (e) => {
        const seekTime = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = seekTime;
    };

    // Show the seekbar time based on the current time of the video
    let animationFrameId;

    const getCurrentTime = () => {
        const currentTime = Math.floor(videoRef.current.currentTime);
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const seekbarTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        return seekbarTime;
    };

    const updateCurrentTime = () => {
        setCurrentTime(getCurrentTime());
        animationFrameId = requestAnimationFrame(updateCurrentTime);
    };

    useEffect(() => {
        if (videoRef.current) {
            updateCurrentTime();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Toggle muted or unmuted for the video based on the value of 'isMuted'
    const toggleMuted = () => {
        setIsMuted(!isMuted);
        if (isMuted) {
            setVolumeValue(70);
            videoRef.current.volume = 0.7;
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
            <AccountPreview data={data.user}>
                <Link
                    className={cx('avatar')}
                    to={`/profile/${data.user.nickname}`}
                    onMouseEnter={handleMouseEnterAvatar}
                    onMouseLeave={handleMouseLeaveAvatar}
                >
                    <Avatar width="56px" height="56px" src={data.user.avatar} alt={data.user.nickname} />
                </Link>
            </AccountPreview>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <AccountPreview data={data.user} className={cx('preview')}>
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
                    </AccountPreview>
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
                        ref={videoCardRef}
                        // onClick={() => console.log('video-card clicked!')}
                    >
                        <video
                            className={cx('video')}
                            src={data.file_url}
                            autoPlay
                            muted={isMuted}
                            loop
                            ref={videoRef}
                            onPlay={handleVideoPlayEvent}
                            onPause={handleVideoPauseEvent}
                            onTimeUpdate={handleTimeUpdate}
                        ></video>
                        <div className={cx('action')}>
                            <div
                                className={cx('action-btn', { show: showControlPanel || isActionClicked })}
                                onClick={handlePlayBtnClick}
                            >
                                {isVideoPlaying ? <PlayIcon /> : <PauseIcon />}
                            </div>
                            <div className={cx('volume-container')} onMouseLeave={handleHideVolumeControl}>
                                <div
                                    className={cx('volume-control', {
                                        show: showVolumeControl,
                                    })}
                                >
                                    <div className={cx('volume-slider')}>
                                        <input
                                            className={cx('volume-slider-track')}
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={volumeValue}
                                            onChange={handleAdjustVolume}
                                        />
                                        <div
                                            className={cx('volume-slider-fill')}
                                            style={{ width: `${volumeValue}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div
                                    className={cx('volume-btn', {
                                        show: isMuted || showControlPanel || isActionClicked,
                                    })}
                                    onMouseEnter={handleShowVolumeControl}
                                    onClick={handleVolumeBtnClick}
                                >
                                    {isMuted ? <VolumeXmarkIcon /> : <VolumeMediumIcon />}
                                </div>
                            </div>
                        </div>
                        <div className={cx('control', { show: showControlPanel || isActionClicked })}>
                            <div className={cx('slider-wrapper')}>
                                <input
                                    className={cx('slider')}
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={currentPercent}
                                    onChange={handleSeekVideo}
                                />
                                <div className={cx('slider-fill')} style={{ width: `${currentPercent}%` }}></div>
                            </div>
                            <div className={cx('seekbar-time')}>{`${currentTime}/${data.meta.playtime_string}`}</div>
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
