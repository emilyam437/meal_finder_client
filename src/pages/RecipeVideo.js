import React, { useState } from 'react';
import Axios from 'axios';

function RecipeVideo() {

    const [recipeTitle, setRecipeTitle] = useState("");
    const [img, setImg] = useState("");
    let [counter, setCounter] = useState(0);
    const [youtubeUrl, setYoutubeUrl] = useState ("");
    const [searchIngredients, setSearchIngredients] = useState([]);
    const [input, setInput] = useState("");
    const [showInfoButton, setShowInfoButton] = useState(false);
    const [showIngredInput, setShowIngredInput] = useState(true);

    const fetchRecipe = () => {

        let ingredients = ""
        
        if (searchIngredients.length > 0) {
    
          ingredients = ingredients +"includeIngredients="

          for (let i=0; i<= counter; i++) {

          if (searchIngredients[i]) {

          ingredients = ingredients + searchIngredients[i]+',+'
        } }

        ingredients = ingredients.slice(0, -2)
}
        let answer = 'yes'

        if (answer) {
          fetchMeal(ingredients);
        }
      }

    const fetchMeal = async (ingredients) => {
      try {
        await Axios.get(`http://localhost:8000/video/${ingredients}`)
    .then((res)=>{
        if (res.data['videos'].length>0){
        setRecipeTitle(res.data['videos'][0]['shortTitle'])
        setImg(res.data['videos'][0]['thumbnail'])
        setShowInfoButton(true);
        setShowIngredInput(false);
        setYoutubeUrl('https://www.youtube.com/watch?v='+res.data['videos'][0]['youTubeId']);
        } else {
          console.log('no search results')
                // let ingredList = ['pasta', 'chicken', 'tomato', 'sugar']
                // let ingred = ingredList[Math.floor(ingredList.length*Math.random)]
                // fetchMeal(`http://localhost:8000/video/${ingred}`)
        }
    })}
    catch(error) {
      await Axios.get(`http://localhost:8000/video-random`)
      .then((res)=>{
          setRecipeTitle(res.data['videos'][0]['shortTitle'])
          setImg(res.data['videos'][0]['thumbnail'])
          setShowInfoButton(true);
          setShowIngredInput(false);
          setYoutubeUrl('https://www.youtube.com/watch?v='+res.data['videos'][0]['youTubeId']);
    })
    }
  }

      const removeIngredient = (index) => {
        let newArr = searchIngredients
        newArr.splice(index, 1)
        setCounter(counter -= 1)
      }





      const resetAll = () => {
        let answer = window.confirm('Reset current ingredients and find a new recipe?')
        if (answer) {
        setRecipeTitle("");
        setImg("");
        setCounter(0);
        setSearchIngredients([]);
        setInput("");
        setYoutubeUrl("");
        setShowInfoButton(false);
        setShowIngredInput(true);
        }
      }

  return (
    <div className="videoPageCont">
        <br/>
        <h2>Discover Recipes Through Videos</h2>
        <br/>
        <div>
            <p>Some ingredients do not have recipe videos. If a video is not found for your desired ingredients, 
                a random video will be displayed.</p>
                <br/>
 <div>
 {(showIngredInput && counter <= 5) ? (<div><p>
    <strong className="sideTitle">Add your desired ingredients: </strong> 
<input type="text" onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter ingredient" value={input} /> 
<button className="addButton" onClick={()=>{setSearchIngredients(searchIngredients.concat(input)); setCounter(counter+=1); setInput("")}}> + </button>
</p></div>) : <h3>Should include:</h3>}
{searchIngredients.map((value, key) => {
          return <div key={key}>
            <p> {value} 
            {showIngredInput && <strong className="removeButton"
            onClick={()=>{removeIngredient(key)}}
            > x </strong>}
            </p>
             </div>
})}
 </div>
</div> 
<br/>
{recipeTitle && <button onClick={resetAll}> New Recipe </button>}
{(searchIngredients.length>0) && (!recipeTitle) && <button className="getButton" onClick={fetchRecipe}> Get Video </button>}
<br/>
<br/>
<h2 className="sideTitle">{recipeTitle}</h2>
<br/>
        {img && <div className="vegImgCont"><img src={img} alt="Recommended recipe"></img></div>}
        {showInfoButton && <p>Watch on
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer"> Youtube</a> </p>}
<br/>
    </div>
  )
}

export default RecipeVideo