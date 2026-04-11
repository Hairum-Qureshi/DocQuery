import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ConversationService } from './conversation.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from 'src/schemas/Conversation';
import { Message, MessageSchema } from 'src/schemas/Message';

@Module({
  imports: [
    AuthModule,
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
