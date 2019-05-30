const   express = require('express'),
        mongoose = require('mongoose'),
        path = require('path'),
        app = express(),
        server = require('http').Server(app),
        io = require('socket.io')(server),
        cors = require('cors'),
        options = {
            socketTimeoutMS: 30000,
            keepAlive: true,
            reconnectTries: 60,
            reconnectInterval: 1000,
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true
        }

app.use(cors())

io.onconnection('connection', socket =>{
    
    socket.on('connectRoom', box =>{
        
        socket.join(box)

    })

})

mongoose.connect('mongodb+srv://mobox:mobox@mobox-ug9dt.mongodb.net/mobox?retryWrites=true', options)

app.use((req, res, next) =>{
    
    req.io = io

    return next()

})

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require("./routes"))

server.listen(3333)