# Global Obesity Visualization

### A d3 visualization of global obesity trends by gender from 1990 - 2013

Live site can be found at [global-obesity-visualization.herokuapp.com](http://global-obesity-visualization.herokuapp.com/)

#### Run the app locally:

- Clone this repository
- Install Postgres and create a database
- Setup the following `config.json` file in the root of the project:
```
{
  "development": {
    "database": "YOUR_DB_NAME",
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
  },
  "test": {
    "database": "YOUR_TEST_DB_NAME",
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
  }
}
```
- Run `./run` from the root of the project to build and run the app
- Open up `localhost:3000` in your favorite browser

If you've set up the app locally you can run the tests with `gulp test`
