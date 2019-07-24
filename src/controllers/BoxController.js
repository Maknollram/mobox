const   Box = require('../models/Box'),
        File = require('../models/File')

class BoxController{
    
    async list(req, res){

        const box = await Box.find().sort( { title: 1 } )// 1 asc, -1 desc

        return res.json(box)
    }

    listBoxes(){

        let boxes = list()

        req.io.sockets.emit('box', boxes)

    }
    
    async store(req, res){
        
        const box = await Box.create({title: req.body.title})

        this.listBoxes()
        
        return res.json(box)

    }

    async show(req, res){

        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {sort: {createdAt: -1}}
        })

        return res.json(box)
    }

    async deleteBox(req, res){

        const box = await Box.findById(req.params.id)
        
        const id = req.params.id
        
        box.files.forEach( async file =>{
        
            await File.deleteOne({_id: file._id})
                
        })
        
        await box.deleteOne({_id: id})

        this.listBoxes()

        return res.json(box)

    }

}

module.exports = new BoxController()
