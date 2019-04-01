fetch("http://localhost:8088/food")
        .then(foods => foods.json())
        .then(parsedFoods => {
                parsedFoods.forEach(function (foodItem) {
                        fetch(
                                `https://world.openfoodfacts.org/api/v0/product/${
                                foodItem.barcode
                                }.barcode.json`
                        )
                                .then(response => response.json())
                                .then(barcodeInfo => {
                                        foodItem.ingredients = barcodeInfo.product.ingredients_text;
                                        foodItem.calories = barcodeInfo.product.nutriments.energy;
                                        foodItem.fat = barcodeInfo.product.nutriments.fat;
                                        foodItem.sugar = barcodeInfo.product.nutriments.sugars;
                                        console.log(barcodeInfo.product);
                                        showFoodCard(foodItem);
                                });
                });
        });

// Create food card/HTML structure
function createFoodCard(foodBase) {
        let foodCard = document.createElement("article");
        let foodName = document.createElement("h3");
        let foodType = document.createElement("h5");
        let foodEth = document.createElement("h5");

        // Additional food information
        let foodIng = document.createElement("p");
        let foodOrg = document.createElement("p");
        let foodCal = document.createElement("p");
        let foodFat = document.createElement("p");
        let foodSug = document.createElement("p");

        foodCard.classList.add("foodcard");

        // Append/add the child elements to the created HTML parent element
        foodCard.appendChild(foodName);
        foodCard.appendChild(foodType);
        foodCard.appendChild(foodEth);

        // Additional food card information
        foodCard.appendChild(foodIng);
        foodCard.appendChild(foodOrg);
        foodCard.appendChild(foodCal);
        foodCard.appendChild(foodFat);
        foodCard.appendChild(foodSug);

        // Add text to the element using dot notation
        foodName.textContent = foodBase.name;
        foodType.textContent = foodBase.type;
        foodEth.textContent = foodBase.ethnicity;

        foodIng.textContent = "ingredients: " + foodBase.ingredients;
        foodCal.textContent = "calories: " + foodBase.calories;
        foodFat.textContent = "fat: " + foodBase.fat;
        foodSug.textContent = "sugar: " + foodBase.sugar;
        console.log(foodBase);
        return foodCard;
}
let display = document.querySelectorAll("article");
function showFoodCard(foodBase) {
        // console.log(foodBase);
        display.forEach(function (article) {
                article.appendChild(createFoodCard(foodBase));
        });
}
function addFoodInfo(ingredients) {
        display.forEach(function (article) {
                article.appendChild(addFoodData(ingredients));
        });
}
