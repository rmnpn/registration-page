import { Module } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';

@Module({})
export class HbsEngineModule {
  static configure(app: NestExpressApplication) {
    app.setBaseViewsDir(join(__dirname, 'views'));
    app.setViewEngine('hbs');
    hbs.registerPartials(join(__dirname, 'views', 'partials'));
    hbs.registerPartials(join(__dirname, 'views', 'partials'));

    hbs.registerHelper('add', (a, b) => a + b);
    hbs.registerHelper('subtract', (a, b) => a - b);
  }
}
