import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';
import AccountItem from './AccountItem';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

const PER_PAGE = 5;

function SuggestedAccounts() {
    const [suggestedAccounts, setSuggestedAccounts] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await userService.getSuggestedAccounts(page, PER_PAGE);

            setSuggestedAccounts((prev) => [...prev, ...res]);
        };

        fetchApi();
    }, [page]);

    const handleSeeMore = () => {
        setPage(page + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>Following accounts</h4>
            {suggestedAccounts.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}
            <button className={cx('see-more')} onClick={handleSeeMore}>
                See more
            </button>
        </div>
    );
}

export default SuggestedAccounts;
