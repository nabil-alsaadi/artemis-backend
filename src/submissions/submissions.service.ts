import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { Block, BlockDocument } from '../blocks/schemas/block.schema';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>,
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
  ) {}

  async createSubmission(blockIds: string[]): Promise<{ success: boolean; message: string }> {
    if (!blockIds || blockIds.length === 0) {
      throw new BadRequestException('No blocks selected');
    }

    // Convert string IDs to ObjectIds and validate them
    const objectIds = blockIds.map((id) => {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid block ID: ${id}`);
      }
      return new Types.ObjectId(id);
    });
    
    // Fetch blocks from the database
    const blocks = await this.blockModel.find({ _id: { $in: objectIds } }).lean().exec();
    console.log('Querying with:', { _id: { $in: objectIds } });
    console.log('Fetched blocks:', blocks);
    console.log('blocks.length !== blockIds.length',blocks.length,blockIds.length,objectIds)
    if (blocks.length !== blockIds.length) {
      throw new NotFoundException('Some blocks do not exist');
    }

    // Categorize blocks into single and grouped
    const singleBlocks = blocks.filter((block) => block.type === 'single');
    const groupedBlocks = blocks.filter((block) => block.type === 'groupped');
    console.log('groupedBlocks',singleBlocks,groupedBlocks)
    // Validation rules
    if (singleBlocks.length > 1) {
      throw new BadRequestException('Only one single block can be selected');
    }

    if (singleBlocks.length > 0 && groupedBlocks.length > 0) {
      throw new BadRequestException('Single block cannot be selected with grouped blocks');
    }

    // Save the submission
    const submission = new this.submissionModel({ blockIds: blockIds });
    await submission.save();

    return { success: true, message: 'Submission successful' };
  }
}
