import { Module } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [PropertiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
