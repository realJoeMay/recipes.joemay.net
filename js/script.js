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
        themeDark();
    } else if (getCookie("theme") == "light") {
        themeLight(); 
    } else {
        themeSystem();
    }
}
checkTheme()



// Handling cookies

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
