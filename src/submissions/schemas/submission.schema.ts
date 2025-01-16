import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {
  @Prop({ required: true, type: [String] })
  blockIds: string[];

  @Prop({ default: Date.now })
  submittedAt: Date;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
