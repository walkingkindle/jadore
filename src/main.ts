import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import *as path from 'path'
import * as hbs from 'express-handlebars'
import * as session from 'express-session'
import * as dotenv from 'dotenv'
async function bootstrap() {
  dotenv.config() 
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const hbs = require('hbs') 
  app.use(
    session({
      secret:'sadsdasdads',
      resave:false,
      saveUninitialized:false
    })
  )
  hbs.registerPartials(path.join(process.cwd(),'views/partials'))
  app.useStaticAssets(path.join(process.cwd(), 'public'))
  app.setViewEngine('hbs');
  app.setBaseViewsDir(path.join(process.cwd(), 'views'))

  await app.listen(3000);
}

bootstrap();
