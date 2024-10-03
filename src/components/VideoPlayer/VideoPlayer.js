import { useEffect, useRef, useState } from 'react';
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
    PauseIcon,
    PlayIcon,
    ShareFillIcon,
    ThinPlusIcon,
    VolumeMediumIcon,
    VolumeXmarkIcon,
} from '~/Icons';
import InteractionItem from './InteractionItem';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data, isMutedGlobal, setIsMutedGlobal, volumeValue, setVolumeValue }) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentPercent, setCurrentPercent] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showCurrentTime, setShowCurrentTime] = useState(false);

    const videoRef = useRef('');

    useEffect(() => {
        const videoElement = videoRef.current;

        const handlePlay = async () => {
            await videoElement.play().catch((error) => {
                console.log('Error attempting to play:', error);
            });
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (videoElement.paused) {
                        videoElement.currentTime = 0;
                        handlePlay();
                    }
                } else {
                    const playPromise = handlePlay();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            videoElement.pause();
                        });
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        observer.observe(videoElement);

        return () => {
            observer.unobserve(videoElement);
        };
    }, []);

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

    // Set 'isVideoPlaying' to true if the video is playing, or false if it paused.
    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
    };

    const handlePauseVideo = () => {
        setIsVideoPlaying(false);
    };

    const handleVideoEnded = () => {
        videoRef.current.play();
    };

    // Toggle video play/pause on video card element click.
    const toggleVideoPlay = () => {
        if (isVideoPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

    const handleTimeUpdate = () => {
        setCurrentPercent((videoRef.current.currentTime / videoRef.current.duration) * 100);
    };

    // Seek the video to the specified position
    const handleSeekVideo = (e) => {
        const seekTime = (e.target.value * videoRef.current.duration) / 100;
        videoRef.current.currentTime = seekTime;
    };

    // Toggle volume on/off on volume button click
    const toggleMuted = () => {
        setIsMutedGlobal(!isMutedGlobal);
        if (isMutedGlobal) {
            setVolumeValue(70);
            videoRef.current.volume = 0.7;
        } else {
            setVolumeValue(0);
        }
    };

    // Adjust volume
    const handleAdjustVolume = (e) => {
        const volumeValue = e.target.value;
        setVolumeValue(volumeValue);
        videoRef.current.volume = volumeValue / 100;
        if (volumeValue === '0') {
            setIsMutedGlobal(true);
        } else {
            setIsMutedGlobal(false);
        }
    };

    // Current time of the video
    let animationFrameId;

    const getCurrentTime = () => {
        const currentTime = Math.floor(videoRef.current.currentTime);
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const videoCurrentTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        return videoCurrentTime;
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

    // Set 'showCurrentTime' to true on slider's onMouseDown event
    const handleShowCurrentTime = () => {
        setShowCurrentTime(true);
    };

    // Set 'showCurrentTime' to false on slider container's onMouseLeave event
    const handleHideCurrentTime = () => {
        setShowCurrentTime(false);
    };

    return (
        <div className={cx('video-container')}>
            <div className={cx('video-card')} onClick={toggleVideoPlay}>
                <video
                    className={cx('video')}
                    src={data.file_url}
                    onPlay={handlePlayVideo}
                    onPause={handlePauseVideo}
                    onTimeUpdate={handleTimeUpdate}
                    ref={videoRef}
                    muted={isMutedGlobal}
                    onEnded={handleVideoEnded}
                />
                <button>
                    {isVideoPlaying ? (
                        <PlayIcon className={cx('pause-icon')} />
                    ) : (
                        <PauseIcon className={cx('play-icon')} />
                    )}
                </button>
                <div className={cx('video-card-top')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('top-left')}>
                        <button className={cx('top-btns')}>
                            <LargeToSmallRectangleIcon />
                        </button>
                        <div className={cx('volume-container')}>
                            <button className={cx('top-btns')} onClick={toggleMuted}>
                                {isMutedGlobal ? <VolumeXmarkIcon /> : <VolumeMediumIcon />}
                            </button>
                            <div className={cx('volume-slider-wrapper')}>
                                <div className={cx('volume-slider')}>
                                    <div
                                        className={cx('volume-slider-fill')}
                                        style={{ width: `${volumeValue}%` }}
                                    ></div>
                                    <input
                                        className={cx('volume-slider-track')}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={volumeValue}
                                        onChange={handleAdjustVolume}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="top-right">
                        <button className={cx('top-btns')}>
                            <EllipsisIcon />
                        </button>
                    </div>
                </div>
                <div className={cx('video-card-bottom')} onClick={(e) => e.stopPropagation()}>
                    {!showCurrentTime && (
                        <>
                            <h3 className={cx('nickname')}>
                                <Link to={`/profile/${data.user.nickname}`}>{data.user.nickname}</Link>
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
                        </>
                    )}
                    {showCurrentTime && (
                        <div className={cx('current-time')}>{`${currentTime} / ${data.meta.playtime_string}`}</div>
                    )}
                </div>
                <div className={cx('slider-container')} onMouseLeave={handleHideCurrentTime}>
                    <div className={cx('slider-fill')} style={{ width: `${currentPercent}%` }}></div>
                    <input
                        className={cx('slider')}
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={currentPercent}
                        onChange={handleSeekVideo}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={handleShowCurrentTime}
                    />
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
    isMutedGlobal: PropTypes.bool,
    setIsMutedGlobal: PropTypes.func,
    volumeValue: PropTypes.number,
    setVolumeValue: PropTypes.func,
};

export default VideoPlayer;
