# Global Obesity Visualization

### A d3 visualization of global obesity trends by gender from 1990 - 2013

Live site can be found at [global-obesity-visualization.herokuapp.com](http://global-obesity-visualization.herokuapp.com/)

#### Run the app locally:

1. Clone this directory
2. Install packages with `npm install`
3. Install postgres
4. Set up the following `config.json` file in the root of the project:
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
5. Run `./run` from the root of the project to setup the db and start the server (may take some time to build)
6. Open up `localhost:3000` in your browser

If you've set up the app locally you can run the tests with `gulp test`
