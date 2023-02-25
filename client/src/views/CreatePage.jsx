import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const CreatePage = () => {

    const navigate = useNavigate()

    const [name, setName] = useState()
    const [dueDate, setDueDate] = useState()
    const [errList, setErrList] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/project`, { name, dueDate })
            .then(res => { navigate('/') })
            .catch(err => {
                const errResponseData = err.response.data.errors
                const tempErrArr = []
                for (const eachKey in errResponseData) {
                    tempErrArr.push(errResponseData[eachKey].message)
                }
                setErrList(tempErrArr)
            })
    }

    return (
        <div>
            <Link className='' to={'/'}> Back to Dashboard </Link>
            <div className='border border-dark p-3 mt-3'>
            <legend>Plan a new project:</legend>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for='projectName' class="form-label"> Project: </label>
                        <input type="text" class="form-control" id='projectName' name="name" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for='projectDueDate' class="form-label"> Due Date: </label>
                        <input type="date" class="form-control" id="projectDueDate" name="dueDate" value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    {
                        errList.map((eachErr, idx) => {
                            return (
                                <p style={{ color: "red" }} key={idx}> {eachErr} </p>
                            )
                        })
                    }
                    <div>
                        <button type="submit" className='btn btn-primary' > Plan Project </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePage