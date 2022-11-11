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



// Theme

function themeDark() {
    clearTheme()
    document.querySelector("body").classList.add("theme-dark");
    setCookie("theme", "dark", 365)
}

function themeLight() {
    clearTheme()
    document.querySelector("body").classList.add("theme-light");
    setCookie("theme", "light", 365)
}

function themeSystem() {
    clearTheme()
    document.querySelector("body").classList.add("theme-system");
    setCookie("theme", "system", 365)
}

function clearTheme() {
    document.querySelector("body").classList.remove("theme-dark");
    document.querySelector("body").classList.remove("theme-light");
    document.querySelector("body").classList.remove("theme-system");
}

function checkTheme() {
    console.log("Checking theme now");
    if (getCookie("theme") == "dark") {
        document.querySelector("#theme-dark").checked = true;
        themeDark();
    } else if (getCookie("theme") == "light") {
        document.querySelector("#theme-light").checked = true;
        themeLight(); 
    } else {
        document.querySelector("#theme-system").checked = true;
        themeSystem();
    }
}
checkTheme()
