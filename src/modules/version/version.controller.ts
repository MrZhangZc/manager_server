import * as fs from 'fs';
import { resolve } from 'path';
import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
const packageJson: any = fs.readFileSync(
  resolve(__dirname, '../../../package.json'),
);

@Controller('/')
export class VersionController {
  @Get()
  public getVersion() {
    return {
      version: JSON.parse(packageJson.toString()).version,
      date: new Date(),
    };
  }
}
