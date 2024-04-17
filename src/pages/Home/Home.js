import { useEffect, useState } from 'react';
import VideoPlayer from '~/components/VideoPlayer';
import * as videoService from '~/services/videoService';
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
            {videosList.map((video) => {
                return <VideoPlayer key={video.id} data={video} />;
            })}
        </div>
    );
}

export default Home;
