import { useState, useEffect, useRef } from 'react';
import * as videoService from '~/services/videoService';
import VideoPlayer from '~/components/VideoPlayer';
// import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
// const settings = config.storage.get();
const INIT_PAGE = 1;

function Home() {
    const [page, setPage] = useState(INIT_PAGE);
    const [videosList, setVideosList] = useState([]);
    const [isMutedGlobal, setIsMutedGlobal] = useState(true);
    const bottomRef = useRef('');

    useEffect(() => {
        console.log('load next page');

        const fetchApi = async () => {
            const res = await videoService.getVideosList('for-you', page);
            setVideosList((prevItems) => [...prevItems, ...res]);
        };

        fetchApi();
    }, [page]);

    // Infinite scroll
    useEffect(() => {
        const bottomElement = bottomRef.current;
        const handleIntersection = (entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
                console.log('you scroll at the bottom of the page');
            }
        };

        const createObserver = () => {
            let observer = new IntersectionObserver(handleIntersection, {
                threshold: 1.0,
            });

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

    // Get the isMutedGlobal value from localStorage
    // useEffect(() => {
    //     setIsMutedGlobal(settings.isMutedGlobal);
    // }, []);

    // Store isMutedGlobal to localStorage
    // useEffect(() => {
    //     settings.isMutedGlobal = isMutedGlobal;
    //     config.storage.set(settings);
    // }, [isMutedGlobal]);

    return (
        <div className={cx('wrapper')}>
            {videosList.map((video) => (
                <VideoPlayer
                    key={video.id}
                    data={video}
                    isMutedGlobal={isMutedGlobal}
                    setIsMutedGlobal={setIsMutedGlobal}
                />
            ))}
            <div className={cx('bottom-element')} ref={bottomRef}></div>
        </div>
    );
}

export default Home;
