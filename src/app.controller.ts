/* eslint-disable prettier/prettier */
import { Controller, Get, Render, Response, Post, Req } from '@nestjs/common';

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
  @Get('/resultPage')
  @Render('resultPage')
  getResult() {
    const data = {
      title: 'Contact Page',
    };
    return data;
  }
  @Post('/resultPage')
  @Render('resultPage')
  postResult(@Req() request) {
    const inputValue = request.body.browse; // Get the input value from the request body
    const data = {
      title: 'Contact Page',
      inputValue: inputValue, // Pass the input value to the template
    };
    return data;
  }
}
