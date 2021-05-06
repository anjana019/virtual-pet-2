//Create variables here
var dog, happyDog, database, foodS, foodStock, getFoodStock, updateFoodStock, deductFood, foodObj, lastFed;
function preload() {

  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  dog = createSprite(250, 250, 15, 15);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);


}


function draw() {
  background(46, 139, 87);
  foodObj.display();
  

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  drawSprites();
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("last Feed :" + lastFed % 12 + "PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog() {
  dog.addImage(happyDogImg);

  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  

  database.ref('/').update({
    
      Food: foodObj.getFoodStock(),
        FeedTime: hour()
  
  })
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

