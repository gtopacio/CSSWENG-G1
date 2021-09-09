const ChatMessage = require("../schemas/chat_message");
const Thread = require("../schemas/chat_thread");

let io;

function init(httpServer){
    io = require("socket.io")(httpServer);

    io.on("connection", (socket) => {
        
        socket.on("join room", (room) => {
            if(room){
                socket.join(room);
                io.emit("receive ping", {userID: room, online: true});
            }
        });

        socket.on("ping", (data) => {
            let { room, requestee } = data;
            if(room){
                let online = io.sockets.adapter.rooms.has(room);
                io.to(requestee).emit("receive ping", {online, userID: room});
            }
        });

        socket.on("disconnecting", () => {
            for(let room of socket.rooms){
                io.emit("receive ping", {userID: room, online: false});
            }
        });

        socket.on("message sent", async(data) => {
            let {msg, sender} = data;
            let {participants, _id} = data.thread;
            if(_id){
                let thread = await Thread.findById(_id);
                let index = thread.numMessage ? thread.numMessage : 0;
                Thread.updateOne({_id}, {$set: {numMessage: index+1, lastUpdated: new Date()}});
                let newMessage = ChatMessage({
                    threadID: _id,
                    sender,
                    textMessage: msg,
                    attachment: [],
                    dateSent: new Date(),
                    index
                });
                await newMessage.save();
                for(x of participants){
                    io.to(x).emit("message sent", newMessage);
                    io.to(x).emit("new message on thread", thread);
                }
            }
        });
        
    });
}

module.exports = {init}