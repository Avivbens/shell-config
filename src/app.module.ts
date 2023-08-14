import { Module } from '@nestjs/common';
import { TreeCommand } from './commands/tree.command';
import { LoggerService } from './services/logger.service';

@Module({
  providers: [LoggerService, TreeCommand],
})
export class AppModule {}
