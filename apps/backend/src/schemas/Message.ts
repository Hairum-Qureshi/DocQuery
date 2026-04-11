import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Message {
  @Prop({ ref: 'Conversation' })
  conversationID: string;

  @Prop({ ref: 'User' })
  senderID: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(Message);
export const MessageSchema = SchemaFactory.createForClass(Message);
export type MessageDocument = HydratedDocument<Message>;

MessageSchema.index({ conversationID: 1, senderID: 1, createdAt: 1 });
