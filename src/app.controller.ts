import { Controller, Get, Render } from '@nestjs/common';

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
    let data = {
      title: 'Contact Page',
    };
    return data;
  }

  @Get('/sign-up')
  @Render('sign-up')
  getSignUp() {
    let data = {
      title: 'Sign-up',
    };
    return data;
  }
}
