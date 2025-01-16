import { Controller, Get } from '@nestjs/common';
import { BlocksService } from './blocks.service';


@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get()
  async getBlocks() {
    return this.blocksService.getBlocks();
  }
}
