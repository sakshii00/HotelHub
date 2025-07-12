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

const r = arr => arr[Math.floor(Math.random() * arr.length)];


const hotelRoomImages = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?auto=format&fit=crop&w=1200&q=80",
];


const seedDb = async () => {
    await Hotelground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const r1 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100);
        const hotel = new Hotelground({
            author: '',
            location: `${cities[r1].city}, ${cities[r1].state}`,
            title: `${r(descriptors)} ${r(places)}`,
            image: r(hotelRoomImages),
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.',
            price: price
        });
        await hotel.save();
    }
};

seedDb().then(() => {
    mongoose.connection.close();
})