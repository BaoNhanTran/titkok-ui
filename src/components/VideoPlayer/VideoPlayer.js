import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    BookmarkFillIcon,
    BubbleEllipsisRightFillIcon,
    CircleCheckIcon,
    EllipsisIcon,
    HeartIcon,
    MusicIcon,
    PauseIcon,
    PlayIcon,
    ShareFillIcon,
    ThinCheckIcon,
    ThinPlusIcon,
    VolumeMediumIcon,
    VolumeXmarkIcon,
} from '~/components/Icons';
import Avatar from '~/components/Avatar';
import InteractionItem from './InteractionItem';
import AccountPreview from '~/components/AccountPreview';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data, isMutedGlobal, setIsMutedGlobal }) {
    const [currentPercent, setCurrentPercent] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [volumeValue, setVolumeValue] = useState(0);

    const videoRef = useRef('');

    // Toggle video play/pause based on full video visibility in the viewport.
    // Option 1:
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
                        // console.log('video is playing:', !videoElement.paused);
                    }
                } else {
                    const playPromise = videoElement.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                videoElement.pause();
                            })
                            .catch((error) => {
                                console.log('Error attempting to play:', error);
                            });
                    }
                }
            });
        };

        let observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        observer.observe(videoElement);

        return () => {
            observer.unobserve(videoElement);
        };
    }, []);

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

    // Toggle video play/pause on action button click.
    const togglePlayVideo = () => {
        if (isVideoPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

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
        setIsMutedGlobal(!isMutedGlobal);
        if (isMutedGlobal) {
            videoRef.current.volume = 0.4;
            setVolumeValue(40);
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
            setIsMutedGlobal(true);
        } else {
            setIsMutedGlobal(false);
        }
    };

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
        {
            icon: <EllipsisIcon />,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('video-card')}>
                    <video
                        className={cx('video')}
                        src={data.file_url}
                        muted={isMutedGlobal}
                        onPlay={handlePlayVideo}
                        onPause={handlePauseVideo}
                        ref={videoRef}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleVideoEnded}
                        onClick={togglePlayVideo}
                    ></video>
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
                            <button className={cx('action-btn')} onClick={togglePlayVideo}>
                                {isVideoPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>
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
                                    />
                                    <div className={cx('slider-fill')} style={{ width: `${currentPercent}%` }}></div>
                                </div>
                            </div>
                            <div className={cx('volume-container')}>
                                <div className={cx('volume-control')}>
                                    <div className={cx('volume-slider-wrapper')}>
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
                                </div>
                                <button className={cx('volume-btn')} onClick={toggleMuted}>
                                    {isMutedGlobal ? <VolumeXmarkIcon /> : <VolumeMediumIcon />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('interaction')}>
                    <AccountPreview data={data}>
                        <div className={cx('avatar-container')}>
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
                        </div>
                    </AccountPreview>
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
    isMutedGlobal: PropTypes.bool.isRequired,
    setIsMutedGlobal: PropTypes.func.isRequired,
};

export default VideoPlayer;
