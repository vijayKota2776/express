const express=require('express');
const bcrypt =require('bcrypt');
const passport=require('passport');
const LocalStratergy=require('passport-local').Strategy;
const app=express();
app.use(express.json())
const colleges=[
    { id:1,name:"ABC College of Engineering",location:"New York"},
    {id:2,name:"XYZ Institute of Technology",location:"California"},
    {id:3,name:"PQR University",location:"Texas"},
    {id:4,name:"LMN College of Arts",location:"Florida"},
    {id:5,name:"DEF School of Business",location:"Illinois"}
];
const users=[];

passport.use(new LocalStratergy((username,password,done)=>{
    const user=users.find((user)=>user.username===username);
    if(!user){
        return done (null,false,{message:'incorrect username'})

    }

    const isMatch =bcrypt.compare(password,user.password);
    if(!isMatch){
        return done (null,false,{message:'incorrect password'});

    }
    return done (null,user);
}))


app.use(passport.initialize());
const isAthenticated=passport.authenticate('local',{session:false});
app.post('/register',async(request,response)=>{
    try {
        const{username,email,password}=request.body;
        const existingUsername=users.find((user)=>user.username===username);
        if(existingUsername){
            response.status(400).json({messege:"user already exists"});
        }



        const existingemail=users.find((user)=>user.email===email);
        if(existingemail){
            response.status(400).json({messege:"email already exists"});
            
        }
        const hashpassword=await bcrypt.hash(password,10)
         const newuser={
            id:users.length+1,
            username:username,
            email:email,
            password:hashpassword,
        }
        users.push(newuser);
        response.status(201).json({messege:'user registered successfully,',newuser})

    } catch (error) {
         response.status(500).json({messege:"internal Server Error"});
    }
})
const requestlogger=(request,response,next)=>{
    console.log(`${request.method}${request.path}-${new Date().toISOString()}`)
    next();

}
app.use(requestlogger);


app.get('/colleges',isAthenticated,(request,response)=>{
    response.send(colleges);

})
app.get('/colleges/:id',isAthenticated,(request,response)=>{
    try {
       const college= colleges.find((college)=>college.id===parseInt(request.params.id))
       if(!college){
        response.status(404).json({messege:"college nor found"});
       }
       else{
        response.send(college);
       }
    } catch (error) {
        response.status(500).json({messege:"internal Server Error"});
    } 
})
app.post('/colleges',isAthenticated,(request,response)=>{
    try {
        const{name,location}=request.body;
        const newcollege={
            id:colleges.length+1,
            name:name,
            location:location,

        };
        colleges.push(newcollege)
                response.status(201).json({messege:"college adaded successfully ",newcollege});
    } catch (error) {
        response.status(500).json({messege:"internal Server Error"});
    }
})
app.put('/colleges/:id',isAthenticated,(request,response)=>{
    try {
        const college= colleges.find((college)=>college.id===parseInt(request.params.id))
        if(!college){
        response.status(404).json({messege:"college nor found"});
       }
       else{
        college.name=request.body.name;
        college.location=request.body.location;
        response.status(200).json({messeges:"college updated",college})
       }
    } catch (error) {
         response.status(500).json({messege:"internal Server Error"});
    }
})
app.get('/',(request,response)=>{
    response.send("welcome to college api")
});
app.delete('/colleges/:id',isAthenticated ,(request,response)=>{
    try {
        const collegeIndex= colleges.findIndex((college)=>college.id===parseInt(request.params.id))
        if(collegeIndex==-1){
        response.status(404).json({messege:"college not found"});
       }
       else{
        colleges.splice(collegeIndex,1);
        response.status(200).json({messege:"college deleted successfully"})
       }
    } catch (error) {
        console.log("server running on 4000");
    }
})
app.listen(4000,()=>{
    console.log("server running on 4000");
    
})



