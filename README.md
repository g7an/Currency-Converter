# Currency Converter

## Description

### Features:

* Convert Currency with selected currency pairs

* Track Currency Trends in last 7 days

### Background

Currency Converter is a React App I made out of the purpose of fun (and understanding more about React). All the functions are realized by simple React components and hooks. The UI of this app has used plenty of [Material UI](https://material-ui.com/), which is a helpful UI library that saves me a lot of headache on UI design. 

All the data of this app is from [The Free Currency Converter API](https://free.currencyconverterapi.com/). It offers nice and generous api service allowing 100 calls per hours with no charge. However, as stated in its documents, it offers no waranty on the accuracy. And as requested, the detailed licence is as below:

> The MIT License (MIT)
>
> Copyright (c) 2014 Manny
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the > Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the > Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A > PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN > ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Demo

TBC

### Installation

Clone the repo:
```
$ git clone https://github.com/g7an/Currency-Converter.git
```

Install all the dependencies:
```
$ npm install
```
If you want to receive the data from the api, register an account from [The Free Currency Converter API](https://free.currencyconverterapi.com/), and add it to your .env file. An example .env file is as below:

```
REACT_APP_BACKEND_API_PROTOCOL=https://
REACT_APP_BACKEND_API_HOST=free.currconv.com/api
REACT_APP_BACKEND_API_VERSION=/v7
REACT_APP_API_KEY=[ADD_YOUR_API_KEY_HERE]
```

