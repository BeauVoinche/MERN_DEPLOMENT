import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const Main = () => {
    const [projectList, setProjectList] = useState([])

    const isPastDue = (dueDate) => {
        const today = new Date();
        return new Date(dueDate) < today;
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/project`)
            .then(res => {
                setProjectList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleUpdate = (updatedList) => {
        setProjectList(updatedList);
    };

    const backlogProjects = projectList.filter(
        (project) => project.status === 'backlog'
    ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const inProgressProjects = projectList.filter(
        (project) => project.status === 'in progress'
    ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const completedProjects = projectList.filter(
        (project) => project.status === 'completed'
    ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const handleBacklogUpdate = (id) => {
        axios.put(`http://localhost:8000/api/project/${id}`, { status: 'in progress' })
            .then((res) => {
                const updatedProject = res.data
                const updatedList = projectList.map((project) => project._id === updatedProject._id ? updatedProject : project)
                handleUpdate(updatedList)
            })
            .catch((err) => console.log(err));
    };

    const handleInProgressUpdate = (id) => {
        axios.put(`http://localhost:8000/api/project/${id}`, { status: 'completed' })
            .then((res) => {
                const updatedProject = res.data
                const updatedList = projectList.map((project) => project._id === updatedProject._id ? updatedProject : project)
                handleUpdate(updatedList)
            })
            .catch((err) => console.log(err))
    };

    const handleCompletedDelete = (id) => {
        axios.delete(`http://localhost:8000/api/project/${id}`)
            .then(res => {handleFilter(id)})
            .catch((err) => console.log(err))
    };

    const handleFilter = (id) => {
        const updatedList = projectList.filter((eachProject) => id !== eachProject._id)
        handleUpdate(updatedList)
    }


    return (
        <div class="container-fluid">
            <table className="table table-bordered border-dark ">
                <thead>
                    <tr>
                        <th scope="col" className='table-primary border border-dark'>Backlog</th>
                        <th scope="col" className='table-warning border border-dark'>In Progress</th>
                        <th scope="col" className='table-success border border-dark'>Completed</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <td className='overflow-y-auto'>
                            {backlogProjects.map((project, idx) => (
                                <div className='border border-dark p-2 mb-2' key={idx}>
                                    <h5>{project.name}</h5>
                                    <p style={{color: isPastDue(project.dueDate) ? 'red' : 'black'}}>Due: {new Date(project.dueDate).toLocaleDateString('en-US')}</p>
                                    <button className='btn btn-warning' onClick={() => handleBacklogUpdate(project._id)}>
                                        Start Project
                                    </button>
                                </div>
                            ))}
                        </td>
                        <td className='overflow-y-auto'>
                            {inProgressProjects.map((project, idx) => (
                                <div className='border border-dark p-2 mb-2' key={idx}>
                                    <h5>{project.name}</h5>
                                    <p style={{color: isPastDue(project.dueDate) ? 'red' : 'black'}}>Due: {new Date(project.dueDate).toLocaleDateString('en-US')}</p>
                                    <button className='btn btn-success' onClick={() => handleInProgressUpdate(project._id)}>
                                        Move to Completed
                                    </button>
                                </div>
                            ))}
                        </td>
                        <td className='overflow-y-auto'>
                            {completedProjects.map((project, idx) => (
                                <div className='border border-dark p-2 mb-2' key={idx}>
                                    <h5>{project.name}</h5>
                                    <p style={{color: isPastDue(project.dueDate) ? 'red' : 'black'}}>Due: {new Date(project.dueDate).toLocaleDateString('en-US')}</p>
                                    <button className='btn btn-danger' onClick={() => handleCompletedDelete(project._id)}>
                                        Remove Project
                                    </button>
                                </div>
                            ))}
                        </td>
                    </tr>
                    <tr className='border border-dark p-2'>
                        <div>
                            <Link to={'/project/create'} className="btn btn-primary" >Add New Project</Link>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Main