
if (localStorage.getItem("favouritesList") == null) {
 localStorage.setItem("favouritesList", JSON.stringify([]));
}
async function fetchMealsFromApi(url,value) {
 const response=await fetch(`${url+value}`);
 const meals=await response.json();
 //console.log(meals)
 return meals;
}

function showMealList(){
 let inputValue = document.getElementById("my-search").value;
 console.log(inputValue);
 var url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
 let meals=fetchMealsFromApi(url,inputValue);
 
 var html='';
 meals.then(data=>{
  if (data.meals) {
   data.meals.forEach((meal) => {
      //console.log(meal)
           html += `
       <div id="card" class="card mb-3" style="width: 20rem;">
           <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
           <div class="card-body">
               <h5 class="card-title">${meal.strMeal}</h5>
               <div class="d-flex justify-content-between mt-5">
                
                 <button id="show-more" onclick="showMealDetails(${meal.idMeal})">more details</button>
                  <button id="tofvrt" onclick="addTofvtList(${meal.idMeal})">addTofvt</button> 

               </div>
           </div>
       </div>
       `;
      
   });
} else {
   html += `
   <div class="page-wrap d-flex flex-row align-items-center">
       <div class="container">
           <div class="row justify-content-center">
               <div class="col-md-12 text-center">
                   <span class="display-1 d-block">404</span>
                   <div class="mb-4 lead">
                       The meal you are looking for was not found.
                   </div>
               </div>
           </div>
       </div>
   </div>
   `;
}
document.getElementById("main").innerHTML = html;
});
}



//its shows full meal details in main
async function showMealDetails(id) {
let url="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
let html="";
await fetchMealsFromApi(url,id).then(data=>{
html += `
 <div id="meal-details" class="mb-5">
   <div id="meal-header" class="d-flex justify-content-around flex-wrap">
     <div id="meal-thumbail">
       <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
     </div>
     <div id="details">
       <h3>${data.meals[0].strMeal}</h3>
       <h6>Category : ${data.meals[0].strCategory}</h6>
       <h6>Area : ${data.meals[0].strArea}</h6>
     </div>
   </div>
   <div id="meal-instruction" class="mt-3">
     <h5 class="text-center">Instruction :</h5>
     <p>${data.meals[0].strInstructions}</p>
   </div>
 </div>
`;
});
document.getElementById("main").innerHTML=html;
}

async function showFavMealList() {
 let arr=JSON.parse(localStorage.getItem("favouritesList"));
 let url="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
 let html="";
 if (arr.length==0) {
     html += `
         <div class="page-wrap d-flex flex-row align-items-center">
             <div class="container">
                 <div class="row justify-content-center">
                     <div class="col-md-12 text-center">
                         <span class="display-1 d-block">not found</span>
                         <div class="mb-4 lead">
                             No meal added in your favourites list.
                         </div>
                     </div>
                 </div>
             </div>
         </div>
         `;
 } else {
     for (let index = 0; index < arr.length; index++) {
         await fetchMealsFromApi(url,arr[index]).then(data=>{
             html += `
             <div id="card" class="card mb-3" style="width: 20rem;">
                 <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                 <div class="card-body">
                     <h5 class="card-title">${data.meals[0].strMeal}</h5>
                     <div class="d-flex justify-content-between mt-5">
                         <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${data.meals[0].idMeal})">More Details</button>
                         <button id="main${data.meals[0].idMeal}" class="btn btn-outline-light active" onclick="addTofvtList(${data.meals[0].idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                     </div>
                 </div>
             </div>
             `;
         });   
     }
 }
 document.getElementById("favourites-body").innerHTML=html;
}

function addTofvtList(id) {
 let arr=JSON.parse(localStorage.getItem("favouritesList"))
 for (let index = 0; index < arr.length; index++) {
     if (id==arr[index]) {
         contain=true;
     }
 }

     arr.push(id);
     alert("your meal add your favourites list");
 
 localStorage.setItem("favouritesList",JSON.stringify(arr));
 showFavMealList();
}

//   // <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${meal.idMeal})">More Details</button>
