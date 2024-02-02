import React ,{useState} from 'react'
import './Wallet.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Wallet() {
  const id = useSelector(state => state.id)
  const token = useSelector(state => state.token)
  const [formData, setFormData] = useState({
    sender : id,
    recipient : '',
    amount : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      
      console.log(token);
      const headers = {
        'Authorization': `${token}`
      };
      // Send data to API using Axios
      const response = await axios.post('http://localhost:5000/wallet/send', formData , { headers });
      console.log('Response:', response.data);
      // Reset form after successful submission
      setFormData({
        sender: '',
        recipient: '',
        amount: '',
      });
      alert('Transaction successful!');
    } catch (error) {
      console.error('Error:', error); // Handle error
      alert('Transaction failed. Please try again.');
    }
  };

  return (
    <div className='walletPage'>
        <div className="paypage">
          <div className="balance">

          </div>
          <div className="transac">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="recipient">Recipient</label>
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>  
    </div>
  )
}

export default Wallet
