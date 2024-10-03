import { useEffect, useRef, useState } from 'react';
import * as videoService from '~/services/videoService';
import VideoPlayer from '~/components/VideoPlayer';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

function Home() {
    const [page, setPage] = useState(INIT_PAGE);
    const [videoList, setVideoList] = useState([]);
    const [isMutedGlobal, setIsMutedGlobal] = useState(true);
    const [volumeValue, setVolumeValue] = useState(0);

    const bottomRef = useRef('');
    const videoRef = useRef('');

    useEffect(() => {
        const fetchApi = async () => {
            const res = await videoService.getVideoList('for-you', page);
            setVideoList((prev) => [...prev, ...res]);
        };

        fetchApi();
    }, [page]);

    useEffect(() => {
        const bottomElement = bottomRef.current;

        const handleIntersection = (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setPage((page) => page + 1);
                // console.log('bottom element is in the viewport', entry.isIntersecting);
                // console.log('load next page');
                // alert('bottom element is in the viewport');
            }
        };
        const createObserver = () => {
            const observer = new IntersectionObserver(handleIntersection, { thresholds: 1 });

            if (bottomElement) {
                observer.observe(bottomElement);
            }

            return () => {
                if (bottomElement) {
                    observer.unobserve(bottomElement);
                }
            };
        };

        window.addEventListener('load', createObserver);

        return () => {
            window.removeEventListener('load', createObserver);
            if (bottomElement) {
                const cleanupObserver = createObserver();
                cleanupObserver();
            }
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videoList.map((video) => (
                <VideoPlayer
                    key={video.id}
                    data={video}
                    isMutedGlobal={isMutedGlobal}
                    setIsMutedGlobal={setIsMutedGlobal}
                    volumeValue={volumeValue}
                    setVolumeValue={setVolumeValue}
                    videoRef={videoRef}
                />
            ))}
            <div className={cx('bottom-element')} ref={bottomRef}></div>
        </div>
    );
}

export default Home;
