import AccountItem from './AccountItem';
import * as userService from '~/service/userService';
import classNames from 'classnames/bind';
import styles from './SuggestedAccount.module.scss';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function SuggestedAccount({ title }) {
    const [suggestedAccounts, setSuggestedAccounts] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await userService.getSuggestedAccount(page, PER_PAGE);
            setSuggestedAccounts((prev) => [...prev, ...res]);
        };

        fetchApi();
    }, [page]);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('title')}>{title}</header>
            {suggestedAccounts.map((account) => {
                return <AccountItem key={account.id} data={account} />;
            })}
            <button
                className={cx('see-more')}
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                See more
            </button>
        </div>
    );
}

export default SuggestedAccount;
