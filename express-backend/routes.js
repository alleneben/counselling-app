const express = require('express');


const router = express.Router();
const usermodel = require('./usermodel')
const casemodel = require('./casemodel');
const threadmodel = require('./threadmodel');
const generateSecret = require('./util')



router.get('/', function(request, response){
    response.status(200).send("hello home")
})


router.post("/login", async (request,response) => {
    const { email, password } = request.body
    // console.log(email);
    let responseData = await usermodel.findOne({email})
    
    if(responseData){
        if(password === responseData.password){
            response.status(200).send({success:true, message:"Login Successful", id: responseData['_id'], role: responseData['role']})
        } else {
            response.status(200).send({message:"wrong username or password"})
        }
    } else {

        response.status(400).send({message:"User does not exist"})
    }
})

router.post('/adduser', async (request,response) => {
    const { email, password, role } = request.body
    let secret = generateSecret(10);
    try {

        let newuser = new usermodel({firstname:'', lastname:'', email:email, password:password, role:role})
    
         responseData =  await newuser.save()
    } catch (error) {
        response.status(400).send({error:true, message: error})
        
    }
    
    response.status(200).send({success:true, message:`The user with email ${email} has been created.`})

})

router.post('/assign', async (request,response) => {
    
    const { email, caseid } = request.body

    try {

        let responseData = await usermodel.findOne({ email: email })  
        let user =  await casemodel.updateOne({_id:caseid},{$set:{counselerid: responseData._id}}) 
        
        user.nModified ? response.status(200).send({success: true, message: "Update successful"}) : response.status(401).send({failure: true, message: "Update failed. Please try again."})
    } catch (error) {
        response.status(400).send({error:true, message: 'Update failed!. Please try again'})  
    }
    
})

router.post("/listusers", async (request,response) => {
    const { role } = request.body

    let usersData = await usermodel.find({$or: [{ role: 'Admin'},{ role: 'Counselor'}]})
    
    if(usersData.length > 0){
        response.status(200).send({success:true, data: usersData})
    } else {
        response.status(400).send({error: true, message:"No users were found for you."})
    }

})


router.post("/counseleesignin", async (request,response) => {
    const { password } = request.body
    
    let responseData = await usermodel.findOne({ password: password })

    if(responseData){
        response.status(200).send({success:true, message:"Login Successful", id: responseData['_id'], role: responseData['role']})
    } else {

        response.status(400).send({message:"User does not exist"})
    }

})

router.post('/counseleesignup', async (request,response) => {
    let responseData = {};
    let secret = generateSecret(10);
    try {

        let newuser = new usermodel({firstname:'', lastname:'', email:'', password:secret, role:'counselee'})
    
         responseData =  await newuser.save()
    } catch (error) {
        response.status(400).send({error:true, message: error})
        
    }
    
    response.status(200).send({success:true, message:`Please copy the secret key and keep it safe. 
                                                      You will need it each time you come to this platform. 
                                                      Once you misplce the secret key, it will be impossible 
                                                      for you to retrieve. Your Secret Key is :: ${secret}`})

})


router.post('/addcase', async (request,response) => {
    const { title, description, counseleeid } = request.body

    
    try {

        let newCase = new casemodel({title: title, counseleeid: counseleeid,counselerid:"", casedate:new Date().toDateString(), status:'Not Responded', thread:[]});
    
        let newCaseResponseData =  await newCase.save()

        let newThread = new threadmodel({caseid: newCaseResponseData['_id'], message: description, counseleeid: counseleeid,counselerid:"", threaddate:new Date().toLocaleDateString(), status:''});
        
        let newThreadResponseData = await newThread.save();


    } catch (error) {
        response.status(400).send({error:true, message: error});   
    }
    
    response.status(200).send({success:true, message:`You have successfully added your case. A counsellor will be assigned to you soon.`})
})

router.post('/addthread', async (request,response) => {
    const { description, counseleeid, caseid, counselorid } = request.body

    
    try {

        let newThread = new threadmodel({caseid: caseid, message: description, counseleeid: counseleeid,counselerid:counselorid, threaddate:new Date().toLocaleDateString(), status:''});
        
        let newThreadResponseData = await newThread.save();


    } catch (error) {
        response.status(400).send({error:true, message: error});   
    }
    
    response.status(200).send({success:true, message:`You have successfully saved your reply.`})
})

router.post("/listadmincases", async (request,response) => {

    let casesData = await casemodel.find({ })
    
    if(casesData.length > 0){

        response.status(200).send({success:true, data: casesData})
    } else {
        response.status(400).send({error: true, message:"No cases were found for you."})
    }

})

router.post("/listcases", async (request,response) => {
    const { counseleeid } = request.body

    let casesData = await casemodel.find({ counseleeid: counseleeid })
    
    if(casesData.length > 0){
        for(let i=0;i<casesData.length;i++){
            let responseThread = await threadmodel.find({ caseid: casesData[i]['_id'] })
            casesData[i]['thread'] = JSON.stringify(responseThread)
        }
        response.status(200).send({success:true, data: casesData})
    } else {
        response.status(400).send({error: true, message:"No cases were found for you."})
    }

})

router.post("/listcounselorcases", async (request,response) => {
    const { counselerid } = request.body

    let casesData = await casemodel.find({ counselerid: counselerid })
    
    if(casesData.length > 0){
        for(let i=0;i<casesData.length;i++){
            let responseThread = await threadmodel.find({ caseid: casesData[i]['_id'] })
            casesData[i]['thread'] = JSON.stringify(responseThread)
        }
        response.status(200).send({success:true, data: casesData})
    } else {
        response.status(400).send({error: true, message:"No cases were found for you."})
    }

})


router.post("/listthreads", async (request,response) => {
    const { caseid } = request.body

    let threads = await threadmodel.find({ caseid: caseid })
    
    if(threads.length > 0){

        response.status(200).send({success:true, data: threads})
    } else {
        response.status(400).send({error: true, message:"No threads were found for your case. Add one"})
    }

})


module.exports = router