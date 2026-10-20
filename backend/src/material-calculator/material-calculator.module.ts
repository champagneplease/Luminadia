import { Module } from '@nestjs/common';
import { MaterialCalculatorController } from './material-calculator.controller';

@Module({
  controllers: [MaterialCalculatorController],
})
export class MaterialCalculatorModule {}
