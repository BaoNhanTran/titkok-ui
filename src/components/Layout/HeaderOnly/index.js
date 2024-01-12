import Header from '~/components/Layout/components/Header';

function HeaderOnly({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
