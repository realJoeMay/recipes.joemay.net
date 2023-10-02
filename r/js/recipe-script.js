var pageBody = document.querySelector("body");




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


// Open & Close Menu

function toggleMenu() {
    console.log('Toggle menu')
    if (pageBody.classList.contains("menu-open")) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    pageBody.classList.add("menu-open");
}

function closeMenu() {
    pageBody.classList.remove("menu-open");
}

setTimeout(function() {
    // fix menu slides out on initial load
    pageBody.classList.remove("loading");
}, 10)




// Togggle Menu Item - Theme

function toggleAppearance() {
    if (pageBody.classList.contains("menu-appearance-open")) {
        hideMenuAppearance();
    } else {
        showMenuAppearance();
    }
}

function showMenuAppearance() {
    pageBody.classList.add("menu-appearance-open");
}

function hideMenuAppearance() {
    pageBody.classList.remove("menu-appearance-open");
}


// Togggle Menu item - Ingredient Details

function toggleDetail() {
    if (pageBody.classList.contains("menu-details-open")) {
        hideMenudetail();
    } else {
        showMenudetail();
    }
}

function showMenudetail() {
    pageBody.classList.add("menu-details-open");
}

function hideMenudetail() {
    pageBody.classList.remove("menu-details-open");
}





// ingredient details

function detailNone() {
    pageBody.classList.remove("show-detail-cost");
    pageBody.classList.remove("show-detail-nutrition");
    pageBody.classList.remove("show-detail-cost-ps");
}

function detailCost() {
    detailNone()
    pageBody.classList.add("show-detail-cost");
}

function detailCostPerServing() {
    detailNone()
    pageBody.classList.add("show-detail-cost-ps");
}

function detailNutrition() {
    detailNone()
    pageBody.classList.add("show-detail-nutrition");
}




// Theme

function themeDark() {
    clearTheme()
    pageBody.classList.add("theme-dark");
    setCookie("theme", "dark", 365)
}

function themeLight() {
    clearTheme()
    pageBody.classList.add("theme-light");
    setCookie("theme", "light", 365)
}

function themeSystem() {
    clearTheme()
    pageBody.classList.add("theme-system");
    setCookie("theme", "system", 365)
}

function clearTheme() {
    pageBody.classList.remove("theme-dark");
    pageBody.classList.remove("theme-light");
    pageBody.classList.remove("theme-system");
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
            // copyButtonText.textContent = "Copied!";
            pageBody.classList.add("copied-ingredients");
            setTimeout(function() {
                // copyButtonText.textContent = "Copy Ingredients";
                pageBody.classList.remove("copied-ingredients");
            }, 3000);
        })
        .catch(function(err) {
            console.error('Unable to copy text: ', err);
        });
});










// Wake Lock

const wakeButton = document.querySelector('#wake-lock-btn');
const wakeSlider = document.querySelector('.menu-wake-lock .slider');

// test wake lock support
let isWakeLockSupported = false;
if ('wakeLock' in navigator) {
    console.log('Screen Wake Lock API supported');
    isWakeLockSupported = true;
    
} else {
    console.log('Wake lock is not supported by this browser');
    pageBody.classList.add("wake-lock-unsupported")
}


if (isWakeLockSupported) {

    // create a reference for the wake lock
    let wakeLock = null;

    // create an async function to request a wake lock
    const requestWakeLock = async () => {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeSlider.classList.add("checked");
            pageBody.classList.add("wake-lock-on");
            console.log('Wake Lock requested');

            // listen for our release event
            wakeLock.onrelease = function(ev) {
                console.log(ev);
            }

            wakeLock.addEventListener('release', () => {
                // if wake lock is released
                console.log('Wake Lock released');
            });

        } catch (err) {
            console.log('Wake Lock request failed')
            
        }
    }


    // if we click our button
    wakeButton.addEventListener('click', (ev) => {
        
        // prevent double trigger on click
        ev.preventDefault();

        if (wakeLock !== null) {
            // Turn off wake lock
            wakeLock.release()
            .then(() => {
                wakeLock = null;
                wakeSlider.classList.remove("checked");
                pageBody.classList.remove("wake-lock-on");
            })
        } else { 
            // Turn on wake lock
            requestWakeLock()
        }
    })

    // Reenable wake lock if switching from another tab
    const handleVisibilityChange = () => {
        console.log('visibilty change handler')
        if (wakeLock !== null) {
            // Turn off wake lock
            wakeLock.release()
            .then(() => {
                wakeLock = null;
                wakeSlider.classList.remove("checked");
                pageBody.classList.remove("wake-lock-on");
            })
            
        }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

}











// Keyboard Shortcuts

document.addEventListener("keydown", function(e) {

    // console.log(e.code );

    // Press m to open menu
    if (e.code === "KeyM") {
        openMenu()
    }

    // Press escape to close menu
    if (e.code === "Escape") {
        closeMenu()
    }

    // Press ctrl-d to toggle debug info
    if (e.ctrlKey && e.code === "KeyB") {
        pageBody.classList.toggle("show-debug");
    }
    
});









