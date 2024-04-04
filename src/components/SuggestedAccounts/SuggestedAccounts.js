import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';
import AccountItem from './AccountItem';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

function SuggestedAccounts({ title }) {
    const [suggestedAccount, setSuggestedAccount] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await userService.getSuggestedAccount(page);
            setSuggestedAccount((prev) => [...prev, ...res]);
        };
        fetchApi();
    }, [page]);

    const handleSeeMore = () => {
        setPage(page + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{title}</p>
            {suggestedAccount.map((account) => {
                return <AccountItem key={account.id} data={account} />;
            })}
            <button className={cx('see-more')} onClick={handleSeeMore}>
                See more
            </button>
        </div>
    );
}

export default SuggestedAccounts;
