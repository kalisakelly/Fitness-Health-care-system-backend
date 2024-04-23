import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response , Request} from "express";


@Injectable()

export class Loggingmiddleware implements  NestMiddleware{
    constructor (private logger: Logger){}

    use(req: Request, res: Response, next: NextFunction) {
    
        const {method , originalUrl:url} = req;
        const reqtime = new Date().getTime();

        res.on('finish',()=>{
            const  {statusCode} = res;
            const restime = new Date().getTime();
            if(statusCode === 200 || statusCode ===201){
                this.logger.log(
                        `${method} ${url} ${statusCode} ${restime}-${reqtime}ms`,
                );
            }


        });   
        
    console.log("User middleware");
    next();
    }

}