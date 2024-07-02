import { useEffect, useState } from 'react';
import * as videoService from '~/services/videoService';
import VideoPlayer from '~/components/VideoPlayer';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [videosList, setVideosList] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await videoService.getVideosList();
            setVideosList(res);
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videosList.map((video) => (
                <VideoPlayer key={video.id} data={video} />
            ))}
        </div>
    );
}

export default Home;
