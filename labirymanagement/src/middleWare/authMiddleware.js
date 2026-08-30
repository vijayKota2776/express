const jwt=require('jsonwebtoken');

authMiddleware=(request,response,next)=>{
    try {
        const {token}=request.headers;

        if(!token){
            return response.status(401).json({message:"Unauthorized"});
        }

        const decodedToken=jwt.verify(token,'timepass');

        if(!decodedToken){
            return response.status(401).json({message:"Token is invalid"});
        }

        request.user=decodedToken;

        next();
    } catch (error) {
        response.status(500).json({message:error.message});
    }
};

module.exports=authMiddleware;