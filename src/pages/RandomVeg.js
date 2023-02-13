import React, { useState } from 'react';
import Axios from 'axios';

function RandomVeg() {

    const [recipeTitle, setRecipeTitle] = useState("");
    const [img, setImg] = useState("");
    const [recipeId, setRecipeId] = useState("");
    let [counter, setCounter] = useState(0);
    const [sourceUrl, setSourceUrl] = useState ("");
    const [searchIngredients, setSearchIngredients] = useState([]);
    const [input, setInput] = useState("");
    const [extendedIngreds, setExtendedIngreds] = useState([]);
    const [intols, setIntols] = useState([]);
    const [diets, setDiets] = useState([]);
    const [showInfoButton, setShowInfoButton] = useState(false);
    const [showIngredInput, setShowIngredInput] = useState(true);

    const createReqDetails = () => {
        
      let details = ""

      if (diets.length > 0) {
        details = details+"diet="

      for (let i=0; i<= diets.length; i++) {
          if (diets[i]) {
              details = details + diets[i]+',+'
            }
        }
        details = details.slice(0, -2)
    }

      if (intols.length > 0) {
        details = details+"&intolerances="
            for (let i=0; i<= intols.length; i++) {
                if (intols[i]) {
                    details = details + intols[i]+',+'
                }
            }
            details = details.slice(0, -2)
        }

      if (searchIngredients.length > 0) {
        details = details +"&includeIngredients="
          for (let i=0; i<= counter; i++) {
            if (searchIngredients[i]) {
            details = details + searchIngredients[i]+',+'
        } 
      }
      details = details.slice(0, -2)
} 
//let answer = window.confirm(details)  
let answer='yes'   
  if (answer) {
          fetchMeal(details);
        }
      }

  const fetchMeal = async (details) => {
      await Axios.get(`https://meal-finder-ingredients.herokuapp.com/recipe/${details}`).then((res)=>{
        if (res.data['id']){
        setRecipeTitle(res.data['title'])
        setImg(res.data['image'])
        setRecipeId(res.data['id'])
        setShowInfoButton(true);
        setShowIngredInput(false);
        } else {
            alert('no results for this search')
        }
    }).catch((err)=> {
      alert(err)
    })
    }

    const getUrl = () => {
        Axios.get(`https://meal-finder-ingredients.herokuapp.com/link/${recipeId}`).then((res)=>{
          setSourceUrl(res.data["sourceUrl"])
          let newArr = []
          setShowInfoButton(false);
          for (let i=0; i< res.data['extendedIngredients'].length; i++) {
            newArr.push(res.data['extendedIngredients'][i]['original'])
          }
          setExtendedIngreds(newArr)
        })
      }

      const removeIngredient = (index) => {
        let newArr = searchIngredients
        newArr.splice(index, 1)
        setCounter(counter -= 1)
      }

      const toggleIntolerance = (e) => {
        if (intols.includes(e.target.value)){
            setIntols(intols.filter((food)=>food !== e.target.value))
        } else {
            setIntols([...intols, e.target.value])
        }
      }

      const toggleDiet = (e) => {
        if (diets.includes(e.target.value)){
            setDiets(diets.filter((food)=>food !== e.target.value))
        } else {
            setDiets([...diets, e.target.value])
        }
      }

      const resetAll = () => {
        let answer = window.confirm('Reset current ingredients and find a new recipe?')
        if (answer) {
        setRecipeTitle("");
        setImg("");
        setRecipeId("");
        setCounter(0);
        setSearchIngredients([]);
        setInput("");
        setSourceUrl("");
        setShowInfoButton(false);
        setShowIngredInput(true);
        setExtendedIngreds([]);
        setIntols([]);
        setDiets([]);
        }
      }

  return (
    <div>
        <br/>
        {showIngredInput && ( <div>
        <h2>Any food intolerances or restrictions? Are you vegetarian?</h2>
        <br/>
        <div className="intolerancesCont">
            <div>
        <input type="checkbox" id="intolerance1" name="intolerance1" value="Eggs" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance1">Eggs</label><br/>
        <input type="checkbox" id="intolerance2" name="intolerance2" value="Gluten" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance2" >Gluten</label><br/>

        <input type="checkbox" id="intolerance3" name="intolerance3" value="Grain" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance3">Grain</label><br/>

        <input type="checkbox" id="intolerance4" name="intolerance4" value="Peanut" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance4">Peanut</label><br/>
        </div>
        <div>
        <input type="checkbox" id="intolerance5" name="intolerance5" value="Seafood" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance5">Seafood</label><br/>

        <input type="checkbox" id="intolerance6" name="intolerance6" value="Sesame"  onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance6">Sesame</label><br/>

        <input type="checkbox" id="intolerance7" name="intolerance7" value="Shellfish" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance7">Shellfish</label><br/>

        <input type="checkbox" id="intolerance8" name="intolerance8" value="Soy" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance8">Soy</label><br/>
        </div>
        <div>
        <input type="checkbox" id="intolerance9" name="intolerance9" value="Sulfite" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance9">Sulfite</label><br/>

        <input type="checkbox" id="intolerance10" name="intolerance10" value="Tree Nut" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance10">Tree Nut</label><br/>

        <input type="checkbox" id="intolerance12" name="intolerance11" value="Wheat" onChange={(e)=>(toggleIntolerance(e))}/>
        <label for="intolerance11">Wheat</label><br/>
        </div>
        <div>
        <input type="checkbox" id="vegi1" name="vegi1" value="Vegetarian" onChange={(e)=>(toggleDiet(e))}/>
        <label for="vegi1">Vegetarian</label><br/>
    <input type="checkbox" id="vegi2" name="vegi2" value="Ovo-Vegetarian" onChange={(e)=>(toggleDiet(e))}/>
        <label for="vegi2">Ovo-Vegetarian</label><br/>
    <input type="checkbox" id="vegi3" name="vegi3" value="Vegan" onChange={(e)=>(toggleDiet(e))}/>
        <label for="vegi3">Vegan</label><br/>
    <input type="checkbox" id="vegi4" name="vegi4" value="Pescetarian" onChange={(e)=>(toggleDiet(e))}/>
        <label for="vegi4">Pescetarian</label><br/>
        </div>
        </div> 
        <br/>
        </div>)}
        <div className="wontIncludeCont">
            <div>
{intols.length>0 && <h3>Food will not include: </h3>}
      {intols.map((value, key) => {
          return <div key={key}>
            <p> {value} </p>
             </div>
})} 
</div>
<div>
{diets.length>0 && <h3>It will be: </h3>}
      {diets.map((value, key) => {
          return <div key={key}>
            <p> {value} </p>
             </div>
})} 
 </div>
 <div 
className="ingredsContCol3"
 >
 {(showIngredInput && counter <= 5) ? (<div>
    <strong className="sideTitle">Add your ingredients: </strong>
<input type="text" onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter ingredient" value={input} /> 
<button className="addButton" onClick={()=>{setSearchIngredients(searchIngredients.concat(input)); setCounter(counter+=1); setInput("")}}> + </button>
</div>) : <h3>Including:</h3>}
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
{recipeTitle ? <button onClick={resetAll}>New Recipe</button> : 
<button className="getButton" onClick={createReqDetails}> Get meal! </button>}
<br/>
<br/>
<div className="recipeRestCont">
    <div>
<h2 className="sideTitle">{recipeTitle}</h2>
<br/>
        {img && <div className="vegImgCont"><img src={img} alt="Recommended recipe"></img></div>}
        {showInfoButton && <button className='moreInfoButton'onClick={getUrl}> More info? </button>}
<br/>
{sourceUrl && <p className="pCenter">Visit <a href={sourceUrl} 
 target="_blank" rel="noopener noreferrer"
>website</a> to view full recipe.</p>}
</div>
<div>
    {extendedIngreds.length > 0 && <h3>Ingredients</h3>}

{extendedIngreds.map((value, key) => {
          return <div key={key}>
            <p>- {value} </p>
             </div>
})}
</div>
    </div>
    </div>
  )
}

export default RandomVeg