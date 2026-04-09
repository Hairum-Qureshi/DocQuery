import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { CreateConversationDTO } from 'DTOs/CreateConversation.dto';
import mongoose, { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Conversation, ConversationDocument } from 'src/schemas/Conversation';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConversationService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
    private readonly configService: ConfigService,
  ) {}

  private async sendURLsToPython(uploadedPDF_URLs: string[]) {
    await axios.post(
      `${this.configService.get<string>('PYTHON_BACKEND')}/process-pdfs`,
      uploadedPDF_URLs,
    );
  }

  private async createConversationMongoDocument(
    currUserID: string,
    title: string,
    documentReferences: string[],
    participantEmails: string[] = [],
  ) {
    const newConversation = new this.conversationModel({
      userID: currUserID,
      title,
      documentReferences,
      participantEmails,
    });

    return newConversation.save();
  }

  async createConversationWithFileUploads(
    createConversationDTO: CreateConversationDTO,
    currUserID: string,
    files: Express.Multer.File[],
  ) {
    const { conversationTitle, participants } = createConversationDTO;

    const conversation = await this.createConversationMongoDocument(
      currUserID,
      conversationTitle,
      [],
      participants
        ? participants.split(',').map((email: string) => email.trim())
        : [],
    );

    const uploadedPDF_URLs = await this.cloudinaryService.uploadPDFs(
      files,
      currUserID,
      conversation._id.toString(),
    );

    await this.conversationModel.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(conversation._id) },
      {
        documentReferences: uploadedPDF_URLs,
      },
    );

    await this.sendURLsToPython(uploadedPDF_URLs);

    return conversation;
  }
}
