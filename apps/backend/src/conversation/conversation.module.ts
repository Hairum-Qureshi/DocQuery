import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ConversationService } from './conversation.service';

@Module({
  imports: [CloudinaryModule],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
