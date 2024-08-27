import {io} from 'socket.io-client';

// check user is in mobile or laptop
const userInDevice =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const url = userInDevice?'http://192.168.117.196:8082':'http://localhost:8082';

const socket = io(url , {
    autoConnect:false
});

export default socket;