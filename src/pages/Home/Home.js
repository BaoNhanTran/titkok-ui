import { useEffect, useState } from 'react';
import * as videoService from '~/services/videoService';
import VideoPlayer from '~/components/VideoPlayer';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [videoList, setVideoList] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await videoService.getVideoList();
            setVideoList(res);
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videoList.map((video) => (
                <VideoPlayer key={video.id} data={video} />
            ))}
        </div>
    );
}

export default Home;
