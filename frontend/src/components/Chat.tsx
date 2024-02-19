// dependencies //
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// initialize socket //
const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Chat: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messageReceived, setMessageReceived] = useState<string>('');

    useEffect(() => {
        // establish socket connection when component mounts //
        socket.connect();

        // event listener for receiving messages //
        socket.on('receive_message', (data) => {
            setMessageReceived(data);
        });

        // cleanup socket connection when component unmounts //
        return () => {
            socket.disconnect();
        }
    }, [socket]);

    const sendMessage = () => {
        socket.emit('send_message', { msg: message });
        setMessage('');
    };

    return (
        <div className="w-screen h-screen bg-slate-200 pt-8 flex flex-col items-center gap-y-1">
            <input 
                className="border-2" 
                type='text' 
                placeholder='Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button 
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                onClick={sendMessage}
            >
                Send Message
            </button>
            <h1>Message: {messageReceived}</h1>
        </div>
    );
};
export default Chat;