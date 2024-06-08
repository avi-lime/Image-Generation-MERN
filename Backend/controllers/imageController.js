require('dotenv').config();
const imageModel = require('../models/imageModel');
const userModel = require('../models/userModel');

const generateImage = async (req, res) => {
    console.log(req.body)
    const { searchText, userId } = req.body
    let imageUrl = ""
    let user = await userModel.findOne({ _id: userId });
    if (user.tokens <= 0) {
        return res.status(400).json({
            status: 'fail',
            message: 'Not enough tokens'
        })
    }
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${searchText}`, {
            headers: {
                Authorization: `Client-ID ${process.env.ACCESS_TOKEN}`
            }
        });
        const data = await response.json();
        const photos = data.results;
        const randomIndex = Math.floor(Math.random() * photos.length);
        const randomPhoto = photos[randomIndex];
        imageUrl = randomPhoto.urls.regular
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to fetch image'
        })
    }
    try {

        const image = new imageModel({
            query: searchText,
            imageUrl,
            userId
        })
        await image.save()

        user = await userModel.findOneAndUpdate({ _id: userId }, { $inc: { tokens: -1 } })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 'fail',
            message: 'Failed to save image'
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'POST Request to /api/v1/images',
        data: {
            searchText,
            imageUrl,
            tokens: user.tokens
        }
    })
}

const getImages = async (req, res) => {
    const { userId } = req.params
    const images = await imageModel.find({ userId }).sort({ createdAt: -1 })
    console.log(images, userId)
    res.status(200).json({
        status: 'success',
        message: 'GET Request to /api/v1/images',
        data: images
    })

}

module.exports = { generateImage, getImages }