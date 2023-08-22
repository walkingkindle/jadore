/* eslint-disable prettier/prettier */
import { Controller, Get, Render, Response } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  @Render('index')
  getHello() {
    const data = {
      title: 'Jadore',
      message: 'Welcome to my application!',
    };
    return data;
  }
  @Get('/contact')
  @Render('contact')
  getContact() {
    const data = {
      title: 'Contact Page',
    };
    return data;
  }
  @Get('/store')
  getStore(@Response() res) {
    return res.redirect('/store/storemain');
  }
  @Get('/product')
  @Render('product')
  getProduct() {
    const data = {
      title: 'Contact Page',
    };
    return data;
  }
}
