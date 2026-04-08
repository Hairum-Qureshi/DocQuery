import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('new')
  @UseInterceptors(FilesInterceptor('files')) // 'files' is the field name in the form
  createConversation(@UploadedFiles() files: Express.Multer.File[]) {
    this.conversationService.createConversation(files); // files is already an array
  }
}
