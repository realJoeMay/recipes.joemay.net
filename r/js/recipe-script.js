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
}, 10)




// Togggle Menu Item - Theme

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


// Togggle Menu item - Ingredient Details

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
    document.querySelector("body").classList.remove("show-detail-nutrition");
    document.querySelector("body").classList.remove("show-detail-cost-ps");
}

function detailCost() {
    detailNone()
    document.querySelector("body").classList.add("show-detail-cost");
}

function detailCostPerServing() {
    detailNone()
    document.querySelector("body").classList.add("show-detail-cost-ps");
}

function detailNutrition() {
    detailNone()
    document.querySelector("body").classList.add("show-detail-nutrition");
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
            // copyButtonText.textContent = "Copied!";
            document.querySelector("body").classList.add("copied-ingredients");
            setTimeout(function() {
                // copyButtonText.textContent = "Copy Ingredients";
                document.querySelector("body").classList.remove("copied-ingredients");
            }, 3000);
        })
        .catch(function(err) {
            console.error('Unable to copy text: ', err);
        });
});







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
        document.querySelector("body").classList.toggle("show-debug");
    }
    
});











var wakeLockButton = document.querySelector("#wake-lock-btn");
var wakeLockToggle = document.querySelector("#awake-slider");

// wakeLockButton.addEventListener("click", function() {
//     console.log('hit wake button')


//     // if (wakeLockToggle.checked) {
//     //     console.log('checked')
//     // } else {
//     //     console.log('not checked')
//     // }
// });





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

        if (pageBody.classList.contains("wake-lock-on")) {
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
        if (wakeLock !== null && document.visibilityState === 'visible') {
            requestWakeLock();
        }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

}