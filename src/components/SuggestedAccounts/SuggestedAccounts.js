import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';
import AccountItem from './AccountItem';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

const PER_PAGE = 5;

function SuggestedAccounts({ title }) {
    const [suggestedAccount, setSuggestedAccount] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await userService.getSuggestedAccount(page, PER_PAGE);
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

SuggestedAccounts.propTypes = {
    title: PropTypes.string,
};

export default SuggestedAccounts;
