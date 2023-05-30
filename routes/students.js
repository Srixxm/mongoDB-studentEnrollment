const express = require('express')
const router = express.Router()
const studentsModel = require('../models/students')

router.get('/', async (request, response) => {
    try{
        const students = await studentsModel.find()
        response.status(200).json(students)
    }
    catch(error) {
        response.status(500).json({message: error})
    }
})

router.post('/', async (request, response) => {
    const newStudent = new studentsModel({
        name:  request.body.name,
        enrollDepartment: request.body.enrollDepartment,
        enrollDate: request.body.enrollDate
    })
    try{
        const student = await newStudent.save()
        response.status(200).json(student)
    }
    catch(error){
        response.status(500).json({message:"error message"})
    }
})

router.get('/:id', getStudent,(request,response)=>{
    response.status(200).json(response.student)
})

router.patch(('/:id'), (request, response) => {
    response.send(`Updating Student informations by id : ${request.params.id}`)
})

router.delete(('/:id'), (request, response) => {
    response.send(`Deleting Student informations by id : ${request.params.id}`)
})


async function getStudent (request,response,next){
    let student 
    try{
        student = await studentsModel.findById(request.params.id)
        if(student = null){
            return response.status(404).json({message:`cannot find the requested user with id ${request.params.id}`})
        }
    }
    catch(error) {
        return response.status(500).json({message:'error message'})
    }
}

module.exports = router