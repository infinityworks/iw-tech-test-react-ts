<p align="center">
  <a href="" rel="noopener">
 <img width=584px height=400px src="https://dwglogo.com/wp-content/uploads/2017/09/1460px-React_logo.png" alt="React logo"></a>
</p>

<h1 align="center">  iw-tech-test-react-ts </h1>

<p align="left">This is the Infinity Works React TypeScript Tech Test. 
<a href="https://handbook.infinityworks.com/running-iw/recruitment/elaborations/front-end-user-story-and-elaboration">More about project here</a>
</p>

---

## 📝 Table of Contents
- [Requirements](#requirements)
- [Getting Started](#getting_started)
- [Deployment](#deployment)

## 🤔 Requirements <a name = "requirements"></a>

- Yarn
- Access to the Internet
- Suitable development environment
- Docker
- Katalon
- Node.JS v14.20.1

## 🏁 Getting Started <a name = "getting_started"></a>

👷 Running Locally

- `git clone https://github.com/fire2124/iw-tech-test-react-ts`
- `cd Frontend/src `

👷 Docker

- `docker build . -t dockerized-react`
- `docker run -p 3000:3000 -d dockerized-react`

👷 Installing

- Install: `yarn install`

👷 Available Scripts

- Build it: `yarn build`
- Run it: `yarn start`
- Test it: `yarn test`

  ***

  - 👷E2E tests
    For this project we will use Katalon Studio -> This tool allow us to record all test cases

  #### Downloading

  For Downloading Katalon you need to login to this page:
  https://testops.katalon.io/login

  #### Authethification
  - this authetification is for WebSite and for Katalon program as well
  login: filip.reichl.work@gmail.com
  password: Jozko-mrkvicka1596

  ***

  #### Installing

  for Mac -> https://download.katalon.com/8.5.2/Katalon%20Studio%20PE.dmg
  for Win -> https://download.katalon.com/8.5.2/Katalon_Studio_PE_Windows_64-8.5.2.zip

  #### Importing Project and running tests

  You need to copy the path to e2e test in our test folder `.../tests/e2e`. Put path to into Katalon, when you are importing new project. After that, only thing you need to do is open test cases folder inside tests explorer, then open All Test Cases and run them. ▶️


## 🔮 For The Future 🤖
- use Story Book to document and test components
https://storybook.js.org/