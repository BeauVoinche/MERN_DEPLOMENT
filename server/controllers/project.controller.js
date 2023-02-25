const { Project } = require("../models/project.model")


module.exports.allProjects = (req, res) => {
    Project.find()
        .then(projectList => res.json(projectList))
        .catch(err => res.status(400).json(err))
}


module.exports.oneProject = (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(oneProject => res.json(oneProject))
        .catch(err => res.status(400).json(err))
}

module.exports.addProject = (req, res) => {
    Project.create(req.body)
        .then(createdProject => res.json(createdProject))
        .catch(err => res.status(400).json(err))
}


module.exports.updateProject = (req, res) => {
    Project.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
        .then(updatedProject => res.json(updatedProject))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteProject = (req, res) => {
    Project.deleteOne({ _id: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(400).json(err))
}