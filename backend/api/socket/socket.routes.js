
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg => {
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myToy).emit('chat addMsg', msg)
        })
        socket.on('user typing', username => {
            io.to(socket.myToy).emit('user typing', username)
        })
        socket.on('chat toy', toyId => {
            if (socket.myToy) {
                socket.leave(socket.myToy)
            }
            socket.join(toyId)
            socket.myToy = toyId;
        })
    })
}