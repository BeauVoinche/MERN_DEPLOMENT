const ProjectController = require("../controllers/project.controller")

module.exports = (app) => {
    app.post("/api/project", ProjectController.addProject)
    app.get("/api/project", ProjectController.allProjects)
    app.get("/api/project/:id", ProjectController.oneProject)
    app.put("/api/project/:id", ProjectController.updateProject)
    app.delete("/api/project/:id", ProjectController.deleteProject)
}