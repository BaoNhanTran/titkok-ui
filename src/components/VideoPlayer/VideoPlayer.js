import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeadelessTippy from '@tippyjs/react/headless';
import Avatar from '~/components/Avatar';
import {
    BookmarkIcon,
    CheckIcon,
    CommentDotsIcon,
    HeartIcon,
    MusicIcon,
    PauseIcon,
    PlayIcon,
    ShareIcon,
    VolumeMediumIcon,
    VolumeXmarkIcon,
} from '~/components/Icons';
import Button from '~/components/Button';
import InteractionItem from './InteractionItem';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';
const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    const [isUnderlined, setIsUnderlined] = useState(false);
    const [showPlayBtn, setShowPlayBtn] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showVolumeRange, setShowVolumeRange] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentPercent, setCurrentPercent] = useState(0);
    const [volumeValue, setVolumeValue] = useState(0);
    const [currentTime, setCurentTime] = useState(0);

    const videoRef = useRef('');

    let animationFrameId;

    const getCurrentTime = () => {
        const current = Math.floor(videoRef.current.currentTime);
        const minutes = Math.floor(current / 60);
        const seconds = Math.floor(current % 60);
        const progressTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        return progressTime;
    };

    const updateCurrentTime = () => {
        setCurentTime(getCurrentTime());
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

    // Handle Scroll
    // useEffect(() => {
    //     const handleScroll = () => {
    //         console.log('scrolling');
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // Underlined nickname when mouse into avatar
    const handleMouseIntoAvatar = () => {
        setIsUnderlined(true);
    };

    const handleMouseOutOfAvatar = () => {
        setIsUnderlined(false);
    };

    // Set the video state whether playing or paused
    const handleVideoPlayEvent = () => {
        setIsVideoPlaying(true);
    };

    const handleVideoPauseEvent = () => {
        setIsVideoPlaying(false);
    };

    // Play or pause video based on its current state (whether it is paused or playing)
    const handlePlayVideo = () => {
        videoRef.current.play();
    };

    const handlePauseVideo = () => {
        videoRef.current.pause();
    };

    // Toggle muted or turn on sound of video
    const toggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
        if (isMuted) {
            setVolumeValue(1);
            console.log('volumeValue:', volumeValue);
            console.log(videoRef.current.volume);
        } else {
            setVolumeValue(0);
            console.log('volumeValue:', volumeValue);
            console.log(videoRef.current.volume);
        }
    };

    // Update video current time on the seek bar
    const handleTimeUpdate = () => {
        setCurrentPercent(Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100));
    };

    const handleSeekVideo = (e) => {
        const seekTime = (e.target.value * videoRef.current.duration) / 100;
        videoRef.current.currentTime = seekTime;
    };

    // Show or hide volume range based on mouse whether enter or leave volume icon
    const handleShowVolumeRange = () => {
        setShowVolumeRange(true);
    };

    const handleHideVolumeRange = () => {
        setShowVolumeRange(false);
    };

    // Adjust the volume range
    const handleAdjustVolume = (e) => {
        console.log('adjust volume range');
        const volume = e.target.value;
        setVolumeValue(volume);
        videoRef.current.volume = volumeValue / 100;
        console.log('🚀 ~ handleAdjustVolume ~ videoRef:', videoRef.current.volume);
        if (volume === '0') {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    // console.log('re-render');

    return (
        <div className={cx('wrapper')}>
            <Link
                className={cx('avatar-link')}
                to={`/profile/${data.user.nickname}`}
                onMouseEnter={handleMouseIntoAvatar}
                onMouseLeave={handleMouseOutOfAvatar}
            >
                <Avatar
                    width="56px"
                    height="56px"
                    className={cx('avatar')}
                    src={data.user.avatar}
                    alt={data.user.nickname}

                    // fallback="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/ffb4569d107f2ce8c0bd01108d65678b~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1705276800&x-signature=OuTEmzv%2BS0Q0jZrxJkAjOBmoqQs%3D"
                />
            </Link>
            <div className={cx('body')}>
                <div className={cx('info-wrapper')}>
                    <Link className={cx('info-link')} to={`/profile/${data.user.nickname}`}>
                        <h3 className={cx('nickname')}>
                            <strong className={cx({ active: isUnderlined })}>{data.user.nickname}</strong>
                            {data.user.tick && <CheckIcon className={cx('tick')} />}
                        </h3>
                        <h4 className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </Link>
                    <Button className={cx('follow-btn')} outline>
                        follow
                    </Button>
                    <p className={cx('desc')}>{data.description}</p>
                    <h4 className={cx('music')}>
                        <MusicIcon className={cx('music-icon')} />
                        <span className={cx('music-tag')}>{data.music || `Sound in video!`}</span>
                    </h4>
                </div>
                <div className={cx('video-container')}>
                    <div className={cx('video-wrapper')}>
                        <video
                            className={cx('video')}
                            src={data.file_url}
                            autoPlay
                            loop
                            muted={isMuted}
                            onPlay={handleVideoPlayEvent}
                            onPause={handleVideoPauseEvent}
                            onTimeUpdate={handleTimeUpdate}
                            ref={videoRef}
                        ></video>
                        <div className={cx('actions')}>
                            <div
                                className={cx('icon', 'play-icon')}
                                onClick={isVideoPlaying ? handlePauseVideo : handlePlayVideo}
                            >
                                {isVideoPlaying ? <PauseIcon /> : <PlayIcon />}
                            </div>
                            <div className={cx('volume-wrapper')} onMouseLeave={handleHideVolumeRange}>
                                <div className={cx('volume-slider', { active: showVolumeRange })}>
                                    <input
                                        className={cx('volume-range')}
                                        type="range"
                                        value={volumeValue}
                                        onChange={handleAdjustVolume}
                                        step="1"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <div
                                    className={cx('icon', 'volume-icon')}
                                    onClick={toggleMute}
                                    onMouseEnter={handleShowVolumeRange}
                                >
                                    {isMuted ? <VolumeXmarkIcon /> : <VolumeMediumIcon />}
                                </div>
                            </div>
                        </div>
                        <div className={cx('control')}>
                            <div className={cx('progress-wrapper')}>
                                <input
                                    className={cx('progress')}
                                    type="range"
                                    value={currentPercent}
                                    onChange={handleSeekVideo}
                                    step="1"
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div className={cx('current-time')}>{`${currentTime}/${data.meta.playtime_string}`}</div>
                        </div>
                    </div>
                    <div className={cx('interaction-wrapper')}>
                        <InteractionItem icon={<HeartIcon />} count={data.likes_count} />
                        <InteractionItem icon={<CommentDotsIcon />} count={data.comments_count} />
                        <InteractionItem icon={<BookmarkIcon />} count={data.views_count} />
                        <InteractionItem icon={<ShareIcon />} count={data.shares_count} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
