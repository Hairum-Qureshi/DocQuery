import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDTO {
  @IsNotEmpty()
  @IsString()
  conversationTitle: string;

  @IsString()
  participants: string;
}
