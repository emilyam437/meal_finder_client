const PORT = 8000;
const express = require("express");
const cors = require('cors');
const Axios = require('axios')
require('dotenv').config()

const app = express();

app.use(cors());

const spoonApi = process.env.secret

const spoonUrlBasecomplex = "https://api.spoonacular.com/recipes/complexSearch?"

const spoonUrlBaseIngredients = "https://api.spoonacular.com/recipes/findByIngredients?ingredients="

const spoonUrlBaseVideos = "https://api.spoonacular.com/food/videos/search?"


app.get('/recipe/:details', async(req, res) => {
    const details = req.params
    Axios.get(`${spoonUrlBasecomplex}${details}&number=1&apiKey=${spoonApi}`)
.then((response)=>{
    res.json(response.data['results'][0])
}).catch((error)=>{
    console.log(error)
})
})

app.get('/link/:recipeId', async(req, res)=>{
    const recipeId = req.params.recipeId
    Axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${spoonApi}`)
    .then((response)=>{
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    })
})

app.get('/by-ingredients/:ingredients', async(req, res)=>{
    const ingredients = req.params.ingredients
    console.log(ingredients)
    await Axios.get(`${spoonUrlBaseIngredients}${ingredients}&number=1&apiKey=${spoonApi}`)
    .then((response)=>{
        res.json(response.data[0])
    }).catch((error)=>{
        console.log(error)
    })
})

app.get('/video/:ingredients', async(req, res)=>{
    const ingredients = req.params.ingredients
    console.log(`${spoonUrlBaseVideos}${ingredients}&number=1&apiKey=${spoonApi}`)
    await Axios.get(`${spoonUrlBaseVideos}${ingredients}&number=1&apiKey=${spoonApi}`)
    .then((response)=>{
        res.json(response.data)
    }).catch((error)=>{
        app.get(`/video-random`, async(req, res)=> {
            await Axios.get(`${spoonUrlBaseVideos}includeIngredients=pasta&number=1&apiKey=${spoonApi}`)
            .then((response)=>{
                res.json(response.data)
                console.log(response.data)
            })
            })
    })
})

app.get(`/video-random`, async(req, res)=> {
    console.log(`${spoonUrlBaseVideos}includeIngredients=pasta&number=1&apiKey=${spoonApi}`)
    await Axios.get(`${spoonUrlBaseVideos}includeIngredients=pasta&number=1&apiKey=${spoonApi}`)
    .then((response)=>{
        res.json(response.data)
    })
    })

app.get("/", async (req, res) => {
res.send('hello backend')
});

app.listen(8000, () => console.log('running on port 8000'))
