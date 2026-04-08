import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('Cloudinary') private readonly cloudinary: typeof Cloudinary,
  ) {}

  uploadPDFs(files: Express.Multer.File[]) {
    console.log(files);
    // Implement your upload logic here
  }
}
