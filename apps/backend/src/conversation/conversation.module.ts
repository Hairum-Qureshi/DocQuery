import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ConversationService } from './conversation.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, CloudinaryModule],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
