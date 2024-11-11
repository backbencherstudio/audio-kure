
const SubPayment = () => {
    return (
        <div>
            <h2 className="text-black">Choose Your Plan</h2>

            <div className="text-black">
                <h2 className="mt-10" >Test</h2>
                <p><b>$5/week</b></p>
                <p>This is the Test plan</p>
                <a className="text-blue-600" href="http://localhost:5000/subscribe?plan=test">Subscribe</a>

                <h2 className="mt-10" >Silver</h2>
                <p><b>$25/week</b></p>
                <p>This is the Silver plan</p>
                <a className="text-blue-600" href="http://localhost:5000/subscribe?plan=Silver">Subscribe</a>

                <h2 className="mt-10" >Gold</h2>
                <p><b>$45/month</b></p>
                <p>This is the Gold plan</p>
                <a className="text-blue-600" href="http://localhost:5000/subscribe?plan=Gold">Subscribe</a>

                <h2 className="mt-10" >Dimond</h2>
                <p><b>$350/year</b></p>
                <p>This is the dimond plan</p>
                <a className="text-blue-600" href="http://localhost:5000/subscribe?plan=Dimond">Subscribe</a>
            </div>
        </div>
    );
};

export default SubPayment;
