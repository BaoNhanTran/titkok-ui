import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import {
    BookmarkFillIcon,
    BubbleEllipsisRightFillIcon,
    CircleCheckIcon,
    HeartFillIcon,
    MusicIcon,
    PlayIcon,
    ShareFillIcon,
    ThinPlusIcon,
    VolumeXmarkIcon,
} from '../Icons';
import InteractionItem from './InteractionItem';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('video-card')}>
                    <video className={cx('video')} src={data.file_url} loop muted></video>
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
                            <div className={cx('action-btn')}>
                                <PlayIcon />
                            </div>
                            <div className={cx('slider-wrapper')}>
                                <input className={cx('slider')} type="range" min="0" max="100" step="1"></input>
                                <div className={cx('slider-fill')}></div>
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
                                        ></input>
                                        <div className={cx('volume-slider-fill')}></div>
                                    </div>
                                </div>
                                <div className={cx('volume-btn')}>
                                    <VolumeXmarkIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('interaction')}>
                    <div className={cx('avatar-container')}>
                        <Link className={cx('avatar')} to={`/profile/${data.nickname}`}>
                            <Avatar width="48px" height="48px" src={data.user.avatar} />
                        </Link>
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

export default VideoPlayer;
