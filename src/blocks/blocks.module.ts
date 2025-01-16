import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './schemas/block.schema';
import { BlocksController } from './blocks.controller';
import { BlocksService } from './blocks.service';
import { BlocksRepository } from './blocks.repository';


@Module({
  imports: [MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }])],
  controllers: [BlocksController],
  providers: [BlocksService, BlocksRepository],
})
export class BlocksModule {}
