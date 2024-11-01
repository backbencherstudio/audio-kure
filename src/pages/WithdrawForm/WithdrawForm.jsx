import { useState } from 'react';
import axios from 'axios';

const WithdrawForm = () => {
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);

    const handleWithdraw = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/payment/withdraw', { amount, email });
            console.log(response?.data?.data.batch_header?.payout_batch_id);
            
            setStatus(`Payout successful! Transaction ID: ${response?.data?.data.batch_header?.payout_batch_id}`);
            // setStatus(`Payout successful! Transaction ID: ${response.data.batch_header.payout_batch_id}`);
        } catch (error) {
            setStatus(`Payout failed: ${error?.response?.data}`);
        }
    };
    

    return (
        <div className='bg-green-500 w-[25%] mx-auto p-10 mt-10 ' >
            <form onSubmit={handleWithdraw}>
                <input
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className='border mt-2 block w-full text-black '
                />
                <input
                    type="email"
                    placeholder="Recipient's PayPal Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border mt-2 block w-full text-black '
                />
                <button className='border mt-10' type="submit">Withdraw</button>
                {status && <p>{status}</p>}
            </form>
        </div>
    );
};

export default WithdrawForm;
