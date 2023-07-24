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

function checkTheme() {
    console.log("Checking theme now");
    if (getCookie("theme") == "dark") {
        document.querySelector("body").classList.add("theme-dark");
    } else if (getCookie("theme") == "light") {
        document.querySelector("body").classList.add("theme-light");
    } else {
        document.querySelector("body").classList.add("theme-system");
    }
}
checkTheme()