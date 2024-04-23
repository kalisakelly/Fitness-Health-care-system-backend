import { Response,Request,NextFunction } from "express";


export default(req: Request,res:Response,next:NextFunction)=>{

    console.log('reached middleware level 1')
    
    next();

}