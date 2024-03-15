import { useEffect, useState } from 'react';
import VideoPlayer from '~/components/VideoPlayer/VideoPlayer';
import * as videoService from '~/service/videoService';

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
        <div>
            {videosList.map((video) => {
                return <VideoPlayer key={video.id} data={video} />;
            })}
        </div>
    );
}

export default Home;
