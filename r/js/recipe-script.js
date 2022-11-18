
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


// Menu

function toggleMenu() {
    if (document.querySelector("body").classList.contains("menu-open")) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    document.querySelector("body").classList.add("menu-open");
}

function closeMenu() {
    document.querySelector("body").classList.remove("menu-open");
}


// ingredient details

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

