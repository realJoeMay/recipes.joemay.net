
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

// fix menu slides out on initial load
setTimeout(function() {
    document.querySelector("body").classList.remove("loading");
}, 1000)




// Togggle Menu Item - THEME

function toggleAppearance() {
    if (document.querySelector("body").classList.contains("menu-appearance-open")) {
        hideMenuAppearance();
    } else {
        showMenuAppearance();
    }
}

function showMenuAppearance() {
    document.querySelector("body").classList.add("menu-appearance-open");
}

function hideMenuAppearance() {
    document.querySelector("body").classList.remove("menu-appearance-open");
}


// Togggle Menu Item - DETAILS

function toggleDetail() {
    if (document.querySelector("body").classList.contains("menu-details-open")) {
        hideMenudetail();
    } else {
        showMenudetail();
    }
}

function showMenudetail() {
    document.querySelector("body").classList.add("menu-details-open");
}

function hideMenudetail() {
    document.querySelector("body").classList.remove("menu-details-open");
}





// ingredient details

function detailNone() {
    document.querySelector("body").classList.remove("show-detail-cost");
}

function detailCost() {
    document.querySelector("body").classList.add("show-detail-cost");
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

function loadPreviousTheme() {
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
loadPreviousTheme()





// Copy Ingredients
var copyButton = document.querySelector("#copy-ingredients-btn");
var copyButtonText = document.querySelector("#copy-ingredients-btn-text");
var textToCopy = document.querySelector("#ingredients-text");

copyButton.addEventListener("click", function() {
    var copiedText = "";
    textToCopy.querySelectorAll("li").forEach(function(line) {
        copiedText += line.textContent.trim() + "\n";
    });
    navigator.clipboard.writeText(copiedText)
        .then(function() {
            copyButtonText.textContent = "Copied!";
            setTimeout(function() {
                copyButtonText.textContent = "Copy Ingredients";
            }, 3000);
        })
        .catch(function(err) {
            console.error('Unable to copy text: ', err);
        });
});

