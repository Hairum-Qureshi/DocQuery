import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateConversationDTO } from 'DTOs/CreateConversation.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('new/with-file-documents')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('documents')) // 'files' is the field name in the form
  createConversation(
    @Body() createConversationDTO: CreateConversationDTO,
    @CurrentUser() currUser: types.UserPayload,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.conversationService.createConversationWithFileUploads(
      createConversationDTO,
      currUser._id,
      files,
    );
  }
}
