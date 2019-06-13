const   express = require('express'),
        mongoose = require('mongoose'),
        path = require('path'),
        app = express(),
        porta = process.env.PORT || 3333,
        server = require('http').Server(app),
        os = require( 'os' ),
        networkInterfaces = os.networkInterfaces(),
        host =  networkInterfaces.wlx002719f5c60a[0].address, // para o adaptador wifi
        // host =  networkInterfaces.enp1s0[0].address,
        mensagens = app.listen(app.get('port'), () => {
            console.log(`A aplicação rodará em http://${host}:${porta}`)
        }),
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

io.on('connection', socket =>{
    
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

server.listen(porta)


// console.log(networkInterfaces) //para saber a variável do endereço
mensagens.on('error', onError);

/**
* Evento listener para os erros do servidor
*/

function onError(error) {

// Lida com erros listen específicos
switch (error.code) {
    case 'EACCES':
        console.error('Faltam privilégios para a pasta do aplicativo.')
        process.exit(1)
        break
    case 'EADDRINUSE':
        console.error(`Porta ${app.get('port')} em uso.`)
        process.exit(1)
        break
    default:
        throw error
}

}