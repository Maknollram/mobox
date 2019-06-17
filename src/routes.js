const   express = require('express'),
        multer = require('multer'),
        routes = express.Router(),
        multerConfig = require('./config/multer'),
        BoxController = require('./controllers/BoxController'),
        FileController = require('./controllers/FileController')

// routes.get('/teste', (req, res) =>{
//     return res.send('E ae!')
// })

routes.post('/boxes', BoxController.store)

routes.get('/boxes/:id', BoxController.show)

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store)

routes.get('/list', BoxController.list)

// routes.post('/boxes/:id/deleteFile', FileController.deleteFile)

// routes.post('/boxes/:id/deleteBox', BoxController.deleteBox)

module.exports = routes