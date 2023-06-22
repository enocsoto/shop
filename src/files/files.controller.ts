import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file'))// nombre de la key del archivo en 
  //postman se debe colocar en el form-data en Key esta palabra
  uploadProductImage(
   /*decorador a utilizar para la carga de archivos*/
    @UploadedFile() file: Express.Multer.File,
    ) {
    
    return {
      filename: file.originalname
    }
  }

 }
