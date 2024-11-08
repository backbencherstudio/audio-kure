
const SubPayment = () => {
    return (
        <div>
            <h2 className="text-black">Choose Your Plan</h2>

            <div className="text-black">
                <h2>Starter</h2>
                <p><b>$20/day</b></p>
                <p>This is the Starter plan</p>
                <a className="text-blue-600" href="http://localhost:5000/subscribe?plan=starter">Subscribe</a>

                <h2>Pro</h2>
                <p><b>$25/month</b></p>
                <p>This is the Pro plan</p>
                <a className="text-blue-600" href="http://localhost:5000/subscribe?plan=pro">Subscribe</a>
            </div>
        </div>
    );
};

export default SubPayment;
