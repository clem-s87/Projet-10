import '../css/accountcard.css';

function AccountCard ({title, amount, description}) {
    return (
        <section className="account">
                <div className="account-info">
                    <h3 className='title'>{title}</h3>
                    <p className='amount'>{amount}</p>
                    <p className='description'>{description}</p>
                </div>
                <div>
                    <button className="account-button">View transaction</button>
                </div>
        </section>
    )
}

export default AccountCard;