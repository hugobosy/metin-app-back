import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConvertValues } from '../types/converter';

@Controller('converter')
export class ConverterController {
  constructor(
    @Inject(ConverterService) private converterService: ConverterService,
  ) {}

  @Post('/won-to-yang')
  async convertWonToYang(@Body() values: ConvertValues) {
    return this.converterService.convertWonToYang(values);
  }

  @Post('/yang-to-won')
  async convertYangToWon(@Body() values: ConvertValues) {
    return this.converterService.convertYangToWon(values);
  }
}
