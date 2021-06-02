# BbPayment

## Project Architecture
The `app component` is the presentation layer of the application. There is a transaction module that constains the  `transaction component`, `transfer view component` and the `transaction service ` 
* The transaction view component is responsible for displaying the list of historical txns
* The Transfer componene is responsible for displaying the checkout form
* The transaction service serves as our store for data
* Other inner layer of the above are in the shared module

## Other Layers

* `shared module` this consists of all reusable components,pipes and service and the external library
* `core service` this is responsible for core services like the http interceptor

## Testing
* Implemented unit testing for core functions and interactions

## Performance
* The aplication is kept dry
* used a few rxjs operators
* Http request is made once in the application life cycle
* Data are locally stored to avoid multiple request to the server

## Error Handling
* Created and interceptor to handle errors. although, there was no much use case. error were logged in the console

## Style 
* used boostrap mainly for the grid
* created reusbale scss files


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
