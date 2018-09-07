const Task = require('../models/Task')

module.exports = {

    createOne: (req, res) => {
        let objTask = {
            author: req.decoded.id,
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate
        }
        Task.create(objTask)
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    getAllDo: (req, res) => {
        Task.find({deleteAt: null, author: req.decoded.id, status: 'do'})
        .sort([['updatedAt', 'descending']])
        .populate('author')
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    getAllDone: (req, res) => {
        Task.find({deleteAt: null, author: req.decoded.id, status: 'done'})
        .sort([['updatedAt', 'descending']])
        .populate('author')
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    getOne: (req, res) => {
        Task.findOne({_id: req.params.id, author: req.decoded.id, deleteAt: null})
        .sort([['updatedAt', 'descending']])
        .populate('author')
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    updateOne: (req, res) => {
        let objTask = {
            author: req.decoded.id,
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate
        }
        Task.findOneAndUpdate({_id:req.params.id, author: req.decoded.id}, objTask)
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    setDone: (req, res) => {
        Task.findOneAndUpdate({_id:req.params.id, author: req.decoded.id}, {status: 'done'})
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    setDo: (req, res) => {
        Task.findOneAndUpdate({_id:req.params.id, author: req.decoded.id}, {status: 'do'})
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    softdelete: (req, res) => {
        Task.findOneAndUpdate({_id:req.params.id, author: req.decoded.id}, {deleteAt: new Date()})
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    unsoftdelete: (req, res) => {
        Task.findOneAndUpdate({_id:req.params.id, author: req.decoded.id}, {deleteAt: null})
        .then( response => {
            res.status(201).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    },

    deleteOne: (req, res) => {
        Task.findOneAndRemove({_id:req.params.id, author: req.decoded.id})
        .then( response => {
            res.status(200).json({content: response})
        })
        .catch( err => {
            res.status(500).json({content: "Internal server error"})
        })
    }


}