const   Box = require('../models/Box'),
        File = require('../models/File'),
        fs = require('fs')
        

class FileController{
    
    async store(req, res){
       
        const box = await Box.findById(req.params.id)

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        })

        box.files.push(file)

        await box.save()

        req.io.sockets.in(box._id).emit('file', file)

        return res.json(file)

    }

    async deleteFile(req, res){

        let box = await Box.findById(req.params.id)
        const file = await File.findById(req.body.fileId)
        const fileId = req.body.fileId
        console.log(JSON.stringify(file.url))
        const files = box.files.filter( file => {
            if(file._id != fileId){
                
                return file

            }
        })

        box.files = files

        await box.save()

        await File.deleteOne( {_id: fileId}).then(
            
            fs.unlink(file.url, (err) => {
                   
                if (err) {
                  
                  console.error(err)

                  return

                }
              
            })
            
        )
            
        box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {sort: {createdAt: -1}}
        })

        req.io.sockets.in(box._id).emit('delete', box)
            
        return res.json(file)

    }

}

module.exports = new FileController()
