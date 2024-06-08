import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-card')}>
                <video src={data.file_url} loop muted></video>
            </div>
            <div className={cx('interaction')}></div>
        </div>
    );
}

export default VideoPlayer;
