const express = require('express')
const uuid = require('uuid')
const members = require('./Member')

const app = express()


app.use(express.json())


//REST API

//Read
app.get("/members",(req,res) =>{
    res.status(200).json(members)
})
//Read Specific
app.get("/member/:id",(req,res) =>{
    const id = req.params.id
    const found = members.some((member)=> member.id === +id)
    if(found){
        const member = members.filter((member) => member.id === +req.params.id)
        return res.status(200).json(member)
    }else{
        res.status(400).json({msg:`No member found with the id of ${req.params.id}`})
    }
})

//Create
app.post("/member",(req,res) =>{
 const {name,email} = req.body
 if(name==="" || email ===""){
    return res.status(400).json({msg:"Please send an email and name"})
 }else{
    const newMember ={
        id:uuid.v4(),   
        name,
        email
    }
    members.push(newMember)
    return res.status(200).json(members)
 }

})

//Update
app.put("/member/:ayush",(req,res) =>{
    const found = members.some((member) => member.id === +req.params.ayush)
    if(found){
        const updMember =req.body
        members.forEach(member=>{
            if(member.id === +req.params.ayush){
                member.name = updMember.name
                member.email = updMember.email
            }
        })
        return res.status(200).json(members)
    }else{
            res.status(400).json({msg:`No member found with the id of ${req.params.uid}`})
    }

})

//Delete
app.delete("/member/:id",(req,res)=>{
    const found = members.some(member => member.id === +req.params.id)
    if(found){
        return res.status(200).json({members:members.filter(member => member.id !== +req.params.id)})
    }else{
        return res.status(400).json({msg:`No member found with the id ${req.params.id}`})
    }
})

const PORT = 3000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))