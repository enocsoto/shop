export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) =>{
    //console.log(file);
    if( !file ) return callback(new Error('File is Empty'), false);
 
    callback(null, true)
}