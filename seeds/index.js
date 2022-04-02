const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Connection Open!");
    }).catch(err => {
        console.log("Oh, no! Error!");
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61e3ddebdaac3863c1da62f8',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque dolores temporibus earum id porro iusto voluptatem fugiat! Vero aspernatur eaque tempore sunt in totam quia. Eaque voluptatum blanditiis est explicabo.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ]
            },
            imgs: [
                {
                    url: 'https://res.cloudinary.com/dahxl1611/image/upload/v1642324497/YelpCamp/hnvwb4qbuwnfcybdjfkd.jpg',
                    filename: 'YelpCamp/hnvwb4qbuwnfcybdjfkd'
                },
                {
                    url: 'https://res.cloudinary.com/dahxl1611/image/upload/v1642324499/YelpCamp/ncytu19rkg0lvuv2jrpx.jpg',
                    filename: 'YelpCamp/ncytu19rkg0lvuv2jrpx'
                }
            ]

        })
        await camp.save();
    }
}
seedDB();