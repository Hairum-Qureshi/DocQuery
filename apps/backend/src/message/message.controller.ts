import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':conversationID/new-message')
  @UseGuards(AuthGuard())
  async addMessageToConversation(
    @CurrentUser() currUser: types.UserPayload,
    @Param('conversationID') conversationID: string,
    @Body('message') message: string,
  ) {
    return await this.messageService.addMessageToConversation(
      currUser._id,
      conversationID,
      message,
    );
  }

  @Get(':conversationID/all')
  @UseGuards(AuthGuard())
  async getAllMessagesForConversation(
    @CurrentUser() currUser: types.UserPayload,
    @Param('conversationID') conversationID: string,
  ) {
    return await this.messageService.getAllMessagesForConversation(
      currUser._id,
      conversationID,
    );
  }
}
