import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ConversationService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  createConversation(files: Express.Multer.File[]) {
    return this.cloudinaryService.uploadPDFs(files);
  }
}
