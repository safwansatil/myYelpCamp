const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*120)+10;
        const camp = new Campground({
            author: '687a83e3de77607976b08853',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          description: 'You know Paris, France? In English, it is pronounced Paris but everyone else pronounces it without the "s" sound, like the French do. But with Venezia, everyone pronounces it the English way: "Venice". Like The Merchant of Venice or Death in Venice. WHY, THOUGH!? WHY ISNT THE TITLE DEATH IN VENEZIA!? ARE YOU FUCKING KIDDING ME!? IT TAKES PLACE IN ITALY, SO USE THE ITALIAN WORD, DAMMIT! THAT SHIT PISSES ME OFF! BUNCH OF DUMBASSES!',
          price,
          geometry:{
            type:"Point",
            coordinates:[cities[random1000].longitude,cities[random1000].latitude]
          },
          images: [
                {
                    url: 'https://res.cloudinary.com/dakocnuxi/image/upload/v1752926355/myYelpCamp/lwz29gfflbystmiakwgu.jpg',
                    filename: 'myYelpCamp/lwz29gfflbystmiakwgu',
                }
          ]
        });
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})