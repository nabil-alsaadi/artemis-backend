import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block, BlockDocument } from './schemas/block.schema';

@Injectable()
export class BlocksRepository {
  constructor(@InjectModel(Block.name) private blockModel: Model<BlockDocument>) {}

  async findAll(): Promise<Block[]> {
    return this.blockModel.find().exec();
  }

  async updateSelectedBlocks(blockIds: string[]): Promise<void> {
    await this.blockModel.updateMany(
      { id: { $in: blockIds } },
      { $set: { selected: true } },
    ).exec();
  }

  async validateBlocks(blockIds: string[]): Promise<boolean> {
    const blocks = await this.blockModel.find({ id: { $in: blockIds } }).exec();
    return blocks.length === blockIds.length;
  }
  async countBlocks(): Promise<number> {
    return this.blockModel.countDocuments().exec();
  }

  async insertBlocks(blocks: Partial<Block[]>): Promise<void> {
    await this.blockModel.insertMany(blocks);
  }
}
