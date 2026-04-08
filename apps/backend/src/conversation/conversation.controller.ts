import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateConversationDTO } from 'DTOs/CreateConversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('new')
  @UseInterceptors(FilesInterceptor('files')) // 'files' is the field name in the form
  createConversation(
    @Body() createConversationDTO: CreateConversationDTO,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    this.conversationService.createConversation(createConversationDTO, files); // files is already an array
  }
}
