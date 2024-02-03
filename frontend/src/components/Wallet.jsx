import React, { useState, useEffect } from 'react';
import './Wallet.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Wallet() {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(true);
  const [amount, setAmount] = useState('');
  const [resid, setResid] = useState('');
  const [toggle,setToggle] = useState(true)
  const [balance, setBalance] = useState(null)
  const id = useSelector(state => state.id);
  const token = useSelector(state => state.token);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Authorization': `${token}`
        };
        const response = await axios.get('http://localhost:5000/list/users', { headers });
        setUser(response.data);
      } catch (error) {
        console.log(error);
        // alert(error)
      }
    };

    fetchData();

    return () => {

    };

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        "sender": id,
        "recipient": resid,
        "amount": amount,
      };
      const headers = {
        'Authorization': `${token}`
      };

      const response = await axios.post('http://localhost:5000/wallet/send', formData, { headers });
      alert(JSON.stringify(response.data));
      setPage(true);
      setAmount('');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleSend = (id) => {
    setResid(id);
    setPage(false);
    return;
  };

  const handlebalance = async (id) => {
    try {
      const headers = {
        'Authorization': `${token}`
      };
      const response = await axios.get(`http://localhost:5000/wallet/balance/${id}`, { headers });
      setBalance(response.data.balance)
      setToggle(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='walletPage'>
      {page ?
        (
          <div className="paypage">
            <div className="block">
              <div className="name">Balance</div>
              <div className="sendmoney">
                  {toggle ? <button className='sendbtn' onClick={() => handlebalance(id)}>Send</button>:<button className='sendbtn'>{balance}</button>}
                </div>
            </div>
            {user.map((data) => (
              <div className="block" key={data._id}>
                <div className="name">{data.username}</div>
                <div className="sendmoney">
                  <button className='sendbtn' onClick={() => handleSend(data._id)}>Send</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="amountsend">
            <div className="formWallet">
              <h2>Input Form</h2>
              <form className='formclass' onSubmit={handleSubmit}>
                <label htmlFor="amountInput">Amount:</label>
                <input
                  type="number"
                  id="amountInput"
                  value={amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                />
                <button type="submit" className='sendbtn'>Submit</button>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}

export default Wallet;
