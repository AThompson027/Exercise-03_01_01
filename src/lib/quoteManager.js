var api = require('./api');

module.exports = {
  updateQuotes () {
    //Promises go back to the concept that a function should return something. 
    //Instead of passing in a callback, you get back a Promise as a returned object
    return new Promise((resolve, reject) => {
      api.getAllPizzas()
        .then((pizzas) => {
          const newData = [];
          let pizza;
          if (err){
            reject(err);
          }
          else {
             //data structure is pizzas in an array and will for loop that each time through will put a key in the variable
          for (const key in pizzas) {
            pizza = pizzas[key];
            newData.push({
              ticker: pizza.ticker,
              nextQuote: pizza.getNext()
            });
          }
    
          //changes the console json display and stringified the information to organize the data to read easier
          console.log(`${JSON.stringify(newData)} updating quotes`);
          resolve(newData);
          }
        })
        .catch(reject);
    });
  }
};
