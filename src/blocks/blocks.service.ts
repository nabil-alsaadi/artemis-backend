import { Injectable } from '@nestjs/common';
import { BlocksRepository } from './blocks.repository';
import { Block } from './schemas/block.schema';

@Injectable()
export class BlocksService {
    constructor(private readonly blocksRepository: BlocksRepository) { }

    async getBlocks() {
        return this.blocksRepository.findAll();
    }
    async generateBlocks() {
        const blockCount = await this.blocksRepository.countBlocks();
    
        if (blockCount === 0) {
          const data = [
            {
              title: 'Block 1',
              description: 'FM Companies',
              type: 'groupped',
              icon: '/icons/ico-org.png',
            },
            {
              title: 'Academy',
              type: 'groupped',
              icon: '/icons/ico-academy.png',
            },
            {
              title: 'Event Companies',
              description: 'Description 3',
              icon: '/icons/ico-event.png',
              type: 'groupped',
            },
            {
              title: 'Local Clubs',
              description: 'Description 3',
              icon: '/icons/ico-local-club.png',
              type: 'single',
            },
            {
              title: 'Community Groups',
              description: 'Description 3',
              icon: '/icons/ico-org.png',
              type: 'single',
            },
          ];
    
          await this.blocksRepository.insertBlocks(data as Block[]);
          return { message: 'Blocks generated successfully.', data };
        }
    
        return { message: 'Blocks already exist.' };
      }
}
