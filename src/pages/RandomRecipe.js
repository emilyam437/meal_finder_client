import Axios from 'axios';
import React, {useState} from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

function Random() {

  const [recipeTitle, setRecipeTitle] = useState("");
  const [img, setImg] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [missedListDetail, setMissedListDetail] = useState([]);
  const [usedListDetail, setUsedListDetail] = useState([]);
  let [counter, setCounter] = useState(0);
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [input, setInput] = useState("");
  const [sourceUrl, setSourceUrl] = useState ("");
  const [showInfoButton, setShowInfoButton] = useState(false);
  const [showIngredInput, setShowIngredInput] = useState(true);
  const [loading, setLoading] = useState(false);


  const getReqMeal = async (urlIngredients) => {
    setLoading(true);
    await axios.get(`https://meal-finder-ingredients.herokuapp.com/by-ingredients/${urlIngredients}`).then((res)=>{
      setRecipeTitle(res.data['title']);
      setImg(res.data['image']);
      setRecipeId(res.data["id"]);
      setShowInfoButton(true);
      setShowIngredInput(false);
      setLoading(false);

      let missedDetail = []
      for (let i=0; i<30; i++) {
        try {
        missedDetail.push(res.data['missedIngredients'][i]['original'])
        } catch {
            break;
        }
      }
      setMissedListDetail(missedDetail)

      let usedDetail = []
      for (let i=0; i<30; i++) {
        try {
        usedDetail.push(res.data['usedIngredients'][i]['original'])
        } catch {
            break;
        }
      }
      setUsedListDetail(usedDetail)

    }).catch((err)=>{
      alert('error')
      alert(err)
    })
  }

  const fetchRecipe = () => {

    let urlIngredients = ""
    for (let i=0; i<= counter; i++) {
      if (searchIngredients[i]) {
        urlIngredients = urlIngredients + searchIngredients[i]+',+'
    } }
    urlIngredients = urlIngredients.slice(0, -2)
    let answer = 'yes'

    if (answer) {
      getReqMeal(urlIngredients);
    }
  }

  const getUrl = () => {
    Axios.get(`https://meal-finder-ingredients.herokuapp.com/link/${recipeId}`)
    .then((res)=>{
      setSourceUrl(res.data["sourceUrl"])
      setShowInfoButton(false);
    })
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
    setRecipeId("");
    setMissedListDetail([]);
    setUsedListDetail([]);
    setCounter(0);
    setSearchIngredients([]);
    setInput("");
    setSourceUrl("");
    setShowInfoButton(false);
    setShowIngredInput(true);
    }
  }

return (
    <div className="randomCont">

<h1 className="pageTitle">Meal Finder</h1>

{(showIngredInput && counter<5) ? 
    (<div>
    <strong className="sideTitle">Add your ingredients: </strong>
<input type="text" onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter ingredient" value={input} /> 

<button className="addButton" onClick={()=>{setSearchIngredients(searchIngredients.concat(input)); setCounter(counter+=1); 
    setInput("")}}> + </button>

</div>) : (<h3>Should include:</h3>)}


{searchIngredients.map((value, key) => {
          return <div key={key}>
            <p> {value} 
            {showIngredInput && <strong className="removeButton"
            onClick={()=>{removeIngredient(key)}}
            > x </strong>}
            </p>
             </div>
})}
<br/>
{usedListDetail.length>0 && <button onClick={resetAll}>New Recipe</button> } 
{searchIngredients.length > 0 && usedListDetail.length===0 && <button className="getButton" onClick={fetchRecipe}> Get meal! </button>}
{loading && <ColorRing /> }
<br/>
<br/>
<h2 className="sideTitle">{recipeTitle}</h2>
<br/>
<div className="photoIngredsCont">


{img && <div><img src={img} alt="Recommended recipe"></img></div>}

<div className="ingredsCont">
{missedListDetail.length>0 && <h3 className="sideSubHead">Ingredients:</h3>}

{usedListDetail.map((value, key) => {
          return <div key={key}>
            <p>- {value} </p>
             </div>
})}
{missedListDetail.map((value, key) => {
          return <div key={key}>
            <p>- {value} </p>
             </div>
})}

</div>
</div> 

{showInfoButton && <button className='moreInfoButton'onClick={getUrl}> More info? </button>}
<br/>
{sourceUrl && <p>Visit <a href={sourceUrl} 
 target="_blank" rel="noopener noreferrer"
>website</a> to view full recipe.</p>}
<br/>
    </div>
  );
}

export default Random;
