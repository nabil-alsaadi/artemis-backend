import { Injectable } from '@nestjs/common';
import { BlocksRepository } from './blocks.repository';

@Injectable()
export class BlocksService {
  constructor(private readonly blocksRepository: BlocksRepository) {}

  async getBlocks() {
    return this.blocksRepository.findAll();
  }
}
