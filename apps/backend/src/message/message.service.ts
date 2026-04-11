import { Injectable } from '@nestjs/common';
import { MessageDocument } from 'src/schemas/Message';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation, ConversationDocument } from 'src/schemas/Conversation';
import { Message } from 'src/schemas/Message';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
  ) {}

  async addMessageToConversation(
    currUserID: string,
    conversationID: string,
    message: string,
  ) {
    return await this.messageModel.create({
      conversationID,
      senderID: currUserID,
      content: message,
    });
  }

  async getAllMessagesForConversation(
    currUserID: string,
    conversationID: string,
  ) {
    return await this.messageModel
      .find({ conversationID, senderID: currUserID })
      .sort({ createdAt: 1 })
      .lean();
  }
}
