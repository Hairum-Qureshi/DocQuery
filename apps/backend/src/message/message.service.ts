import { Injectable } from '@nestjs/common';
import { MessageDocument } from 'src/schemas/Message';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation, ConversationDocument } from 'src/schemas/Conversation';
import { Message } from 'src/schemas/Message';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
    private readonly configService: ConfigService,
  ) {}

  async addMessageToConversation(
    currUserID: string,
    conversationID: string,
    message: string,
  ) {
    await this.messageModel.create({
      conversationID,
      senderID: currUserID,
      content: message,
    });

    const response = await axios.post(
      `${this.configService.get<string>('PYTHON_BACKEND')}/user-query/${conversationID}`,
      {
        user_id: currUserID,
        query: message,
      },
    );

    return await this.messageModel.create({
      conversationID,
      senderID: '0000000000000001',
      content: response.data.answer,
    });
  }

  async getAllMessagesForConversation(conversationID: string) {
    return await this.messageModel
      .find({ conversationID })
      .sort({ createdAt: 1 })
      .lean();
  }
}
