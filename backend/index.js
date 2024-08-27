import express from 'express';
import {createServer} from 'node:http';
import path from 'node:path';
import {Server} from 'socket.io';


const PORT = 8082;
const app = express();
const server = createServer(app);



const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000", "http://192.168.117.196:3000"],
        methods:['GET','POST']
    }
});


const stockRandomData = (range=100)=>{

    const data = {
        cost:'0',
        costPerRate:'0'
    };

    data.cost = Math.round(Math.random()*range).toString();
    const isNegativeTime = Math.random()<0.5;
    const costPerRateValue = Math.round(Math.random()*range);
    data.costPerRate = (isNegativeTime?-costPerRateValue:costPerRateValue).toString();
    return data;
}

io.on('connection',(socket)=>{
    console.log('socket connected' );
    socket.on('user',(data)=>{
        console.log('get data : ',data)
    });

    const intervalId = setInterval(()=>{
        const StockData = stockRandomData(100_00);
        socket.emit('server',StockData);
        console.log(StockData);
    },1000);

    socket.on('disconnect' , ()=>{
        console.log('socket disconnected ');
        clearInterval(intervalId);
    })
})

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./index.html'));
});

server.listen(PORT,()=>{
    console.log('server run on port : ', PORT);
})