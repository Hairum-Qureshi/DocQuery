import { Injectable } from '@nestjs/common';
import { CreateConversationDTO } from 'DTOs/CreateConversation.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ConversationService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  createConversationWithFileUploads(
    createConversationDTO: CreateConversationDTO,
    currUserID: string,
    files: Express.Multer.File[],
  ) {
    return this.cloudinaryService.uploadPDFs(files, currUserID);
  }
}
