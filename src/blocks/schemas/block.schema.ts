import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlockDocument = Block & Document;

@Schema()
export class Block {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true, enum: ['single', 'groupped'] })
  type: 'single' | 'groupped';
}

export const BlockSchema = SchemaFactory.createForClass(Block);
