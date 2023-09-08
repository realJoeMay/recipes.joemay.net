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
    
    // loop through each card
    for (var i = 0; i < cards.length; i++) {
        
        var searchItems = cards[i].getElementsByClassName("search-target");
        cards[i].classList.remove("search-result-card");
        var searchFound = false

        // first clear all search targets
        for (var j = 0; j < searchItems.length; j++) {
            searchItems[j].classList.remove("search-result");
        }

        // now check for search
        for (var j = 0; j < searchItems.length; j++) {
            var text = searchItems[j].innerText.toLowerCase();

            if (text.includes(input)) {
                searchItems[j].classList.add("search-result");
                cards[i].classList.add("search-result-card");
                break    
            }
        }

        // check if the input is empty
        if (input == "") {
            document.querySelector("body").classList.remove("search-active")
            cards[i].classList.remove("search-result");
        } else {
            document.querySelector("body").classList.add("search-active")
        }


    }
}