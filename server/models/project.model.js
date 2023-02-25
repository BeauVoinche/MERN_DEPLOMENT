const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Project name is required"],
        minlength: [3, "Project name must be at least 3 characters"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is Required"],
        min: [Date.now(), "Due date must be in the future"],
        max: [Date.now() + 365 * 24 * 60 * 60 * 1000, "Due date can't be more than 1 year in the future"]
    },
    status: {
        type: String,
        enum: ['backlog', 'in progress', 'completed'],
        default: 'backlog'
    },
}, { timestamps: true })

module.exports.Project = mongoose.model('Project', ProjectSchema)