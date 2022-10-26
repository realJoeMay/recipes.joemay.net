function toggleNav() {
    if (document.querySelector("body").classList.contains("nav-open")) {
        closeNav();
    } else {
        openNav();
    }
}

function openNav() {
    document.querySelector("body").classList.add("nav-open");
}

function closeNav() {
    document.querySelector("body").classList.remove("nav-open");
}

function showIngredientCost() {
    document.querySelector("body").classList.add("show-ingredient-cost");
}

function showIngredientNone() {
    document.querySelector("body").classList.remove("show-ingredient-cost");
}
