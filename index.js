const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
  })
      // Run your code here, after you have insured that the connection was made
  .then(() => Recipe.create({title: "Tiramisu", level: "Easy Peasy", ingredients: ["eggs", "sugar", "mascarpone", "cocoa powder", "Disaronno", "coffee"], cuisine: "Italian", dishType: "dessert", image: "https://www.pexels.com/photo/close-up-shot-of-a-sliced-cake-6880219/", duration: 60, creator: "Giulia"})
  )
  .then(giuliaRecipe => console.log("title of recipe", giuliaRecipe.title))
  .then(() => Recipe.insertMany(data))
  // .then(() => console.log(data))
  .then(recipeArray => recipeArray.forEach(recipe => console.log("title of recipe: ", recipe.title)))
  .then(() => Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}))
  .then(()=> console.log("recipe duration updated successfully. New duration: ", ))
  .then(() => Recipe.deleteOne({title: "Carrot Cake"}))
  .then(() => console.log(`"The recipe has been deleted`))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
