
import './App.css';
import { useEffect, useState } from 'react';
import socket from './socket';

function App() {
  const [isCostPerRateNegative, setIsCostPerRateNegative] = useState(false);
  const [isCostNegative, setIsCostNegative] = useState(false);

  const [costData, setCostData] = useState('');
  const [costPerRateData, setCostPerRateData] = useState('');


  useEffect(()=>{
    // Listen for server events and update the UI
    socket.on('server', (data) => {
      // console.log(data);
      setCostData(data.cost);
      setCostPerRateData(data.costPerRate);
    });

    // Listen for when the socket is disconnected
    socket.on('disconnect', () => {
      console.log(socket.id ? `Disconnect event triggered. ID: ${socket.id}`: "Socket is Disconnect successfully.");
    });
    
    // Listen for when the socket is connected
    socket.on('connect', () => {
      console.log('Successfully connect with id:', socket.id);
    });
  },[])



  // Function to disconnect the socket
  const DisconnectIO = () => {
    console.log('Try to disconnect with id : ', socket.id);
    socket.disconnect();
  }

  // Function to connect/reconnect the socket
  const ConnectIO = () => {
    console.log('Try to connect');
    socket.connect();
  };


  useEffect(() => {
    for (const element of costPerRateData) {
      if (element === '-') {
        setIsCostPerRateNegative(true);
        break;
      } else {
        setIsCostPerRateNegative(false);
      }
    }
  }, [costPerRateData]);

  useEffect(() => {
    for (const element of costData) {
      if (element === '-') {
        setIsCostNegative(true);
        break;
      } else {
        setIsCostNegative(false);
      }
    }
  }, [costData]);

  return (
    <div className="app_main">
      <div className='app_main_data_div_main'>
        <span id='data_show'>
          <span id='cost'>Cost :  <span id='costPerRate' style={{ color: isCostNegative ? '#e71010' : '#00B368' }}>{costData || '00,000'}</span></span>
          <span id='costPerRate'>Cost Per Rate : <span id='costPerRate' style={{ color: isCostPerRateNegative ? '#e71010' : '#00B386' }}>{costPerRateData || '00,000'}</span></span>
        </span>
        <span id='btn'>
          <button id='btn_dis_cnt' onClick={() => { DisconnectIO() }}>Disconnect</button>
          <button id='btn_cnt' onClick={() => { ConnectIO() }}>Connected</button>
        </span>
      </div>

    </div>
  );
}

export default App;
