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




// Search Recipes

function search() {

    var input = document.querySelector(".search-input").value.toLowerCase();
    var cards = document.querySelectorAll(".recipe-card");

    if (input == "") {
        document.querySelector("body").classList.remove("search-active");
    } else {
        document.querySelector("body").classList.add("search-active");
    }
    
    // loop through each card
    for (var i = 0; i < cards.length; i++) {
        
        var searchTargets = cards[i].querySelectorAll(".search-target");
        var ingredientSearchTargets = cards[i].querySelectorAll(".ingredient.search-target");

        // first clear all search targets
        for (var j = 0; j < searchTargets.length; j++) {
            searchTargets[j].classList.remove("search-result");
        }

        // now check for search
        var cardMatch = false
        for (var j = 0; j < searchTargets.length; j++) {
            var text = searchTargets[j].innerText.toLowerCase();

            if (text.includes(input)) {
                searchTargets[j].classList.add("search-result");
                var cardMatch = true

                // Set order
                if (searchTargets[j].classList.contains('recipe-title')) {
                    cards[i].style.order = 1
                } else if (searchTargets[j].classList.contains('recipe-subtitle')) {
                    cards[i].style.order = 2
                } else if (searchTargets[j].classList.contains('ingredient')) {
                    cards[i].style.order = 5
                }
                break
            }
        }

        if (cardMatch) {
            cards[i].classList.remove("search-no-match");
        } else {
            cards[i].classList.add("search-no-match");
        }

    }
}


function clearSearchInput() {
    document.querySelector('.search-input').value = '';
    document.querySelector('body').classList.remove("search-active")

    var cards = document.querySelectorAll(".recipe-card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("search-no-match");
    }

    document.querySelector('.search-input').focus();
    document.querySelector('.search-input').select();
}



// Keyboard Shortcuts
document.addEventListener("keydown", function(e) {

    // console.log(e.code);
    
    // Press s to select search input
    if (e.code === "KeyS" && document.activeElement.tagName != "INPUT") {
        document.querySelector('.search-input').focus();
        document.querySelector('.search-input').select();
        e.preventDefault() // Prevent typing into search input
    }

    // Press escape to clear input
    if (e.code === "Escape" && document.activeElement.tagName === "INPUT") {
        clearSearchInput()
    }
    
});

