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
  @Get('/payment')
  @Render('payment')
  getPayment() {
    const data = {
      title: 'Payment and Delivery',
    };
    return data;
  }
  @Get('/about')
  @Render('about')
  getAbout() {
    const data = {
      title: 'About Us',
    };
    return data;
  }
  @Get('/catalogue')
  @Render('catalogue')
  getCatalogue() {
    const data = {
      title: 'Catalogue',
    };
    return data;
  }
  @Get('/cart')
  @Render('cart')
  getCart() {
    const data = {
      title: 'Cart',
    };
    return data;
  }
}
