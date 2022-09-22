# GIT Pages
ng build --prod --base-href "https://fabienmacip.github.io/sallesport/" -> ok
"https://github.com/fabienmacip/sallesport.git" -> nok


npx angular-cli-ghpages --dir=dist/scd/



# Ancien contenu de angular.json -> deploy
  "builder": "@angular/fire:deploy",
  "options": {
    "prerender": false,
    "ssr": false,
    "browserTarget": "scd:build:production",
      "firebaseProject": "sandrine-coupart-dieteticienne",
    "firebaseHostingSite": "sandrine-coupart-dieteticienne"
  }

# package.json -> dependencies
"firebase": "^9.9.3", 
# Scd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhUxR0AksJbZ2uOtP1Gpj2Q-v06JxaLQU",
  authDomain: "sandrine-coupart-dieteticienne.firebaseapp.com",
  projectId: "sandrine-coupart-dieteticienne",
  storageBucket: "sandrine-coupart-dieteticienne.appspot.com",
  messagingSenderId: "207438250227",
  appId: "1:207438250227:web:114e64bdafc1a1f5bb7786"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

