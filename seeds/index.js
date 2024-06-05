require('dotenv').config();
const mongoose = require('mongoose');
const Hotelground = require('../models/hotelground');

const { places, descriptors } = require('./seedhelpers')
const cities = require('./cities')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection established.");
    })
    .catch(err => {
        console.log('Error in establishing connection.');
        console.log(err);
    })

const r = arr => arr[Math.floor(Math.random() * arr.length)]


const seedDb = async () => {
    await Hotelground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const r1 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.floor(Math.random() * 100))
        const hotel = new Hotelground({
            author: process.env.SAMPLE_AUTHOR_ID,
            location: `${cities[r1].city}, ${cities[r1].state}`,
            title: `${r(descriptors)} ${r(places)}`,
            image: 'https://source.unsplash.com/random/900×700/?hotel_room',


            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.',
            price: price
        })
        await hotel.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})