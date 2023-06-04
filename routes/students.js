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

router.get('/:id', getStudent ,(request,response)=>{
    response.status(200).json(response.student)
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



router.patch(('/:id'), getStudent, async(request, response) => {
    // response.send(`Updating Student informations by id : ${request.params.id}`)
    if (request.body.name != null){
        response.student.name = request.body.name
    }
    if (request.body.enrollDepartment != null){
        response.student.enrollDepartment = request.body.enrollDepartment
    }

    
    try{
        const updateStudent = await response.student.save() // saving the details sent by user
        response.status(201).json(updateStudent)
    }
    catch (error){
        response.status(400).json({message:error.message})
    }

})

router.delete(('/:id'), getStudent ,async (request, response) => {
    // response.send(`Deleting Student informations by id : ${request.params.id}`)
    try{
        await response.student.deleteOne()
        response.json({message:`Deleted ${response.student.name} `})
    }
    catch(error){
        response.status(500).json({message:error.message})
    }
})


async function getStudent (request,response,next){
    let student 
    try{
        student = await studentsModel.findById(request.params.id)
        if(student == null){
            return response.status(404).json({message:`cannot find the requested user with id ${request.params.id}`})
        }
        response.student = student 
    next()
    }
    
    catch(error) {
        return response.status(500).json({message:'error message'})
    }
}

module.exports = router