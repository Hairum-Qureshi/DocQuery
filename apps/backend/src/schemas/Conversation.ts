import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Conversation {
  @Prop({ ref: 'User' })
  userID: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], default: [], required: true })
  documentReferences: string[];

  @Prop({ type: [String], default: [], ref: 'User' })
  participantEmails: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(Conversation);
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
export type ConversationDocument = HydratedDocument<Conversation>;

ConversationSchema.index({ userID: 1 });
