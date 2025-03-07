
function toggleNav() { //modified collapsable side bar version of w3 example
    let sidebar = document.getElementById("mysidebar");
    let main = document.getElementById("main");

    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        main.style.marginLeft = "0";
    } else {
        sidebar.style.width = "250px";
        main.style.marginLeft = "250px";
    }
}

function toggleCategoriesbar() { // script to toggle categories bar off/on
    let categoriesbar = document.getElementById("categoriesbar");
    let membersbar = document.getElementById("membersbar");
    let profilebar = document.getElementById("profilebar");

    // close other bars if they are open
    if (membersbar.style.width === "300px") {
        membersbar.style.width = "0";
    }
    if (profilebar.style.width === "300px") {
        profilebar.style.width = "0";
    }

    // toggle the categories bar
    if (categoriesbar.style.width === "300px") {
        categoriesbar.style.width = "0";
    } else {
        categoriesbar.style.width = "300px";
    }
}

function toggleMembersbar() { // toggles the members bar on/off
        let membersbar = document.getElementById("membersbar");
        let categoriesbar = document.getElementById("categoriesbar");
        let profilebar = document.getElementById("profilebar");

        // close other bars if they are open
        if (categoriesbar.style.width === "300px") {
            categoriesbar.style.width = "0";
        }
        if (profilebar.style.width === "300px") {
            profilebar.style.width = "0";
        }

        // toggle the members bar
        if (membersbar.style.width === "300px") {
            membersbar.style.width = "0";
        } else {
            membersbar.style.width = "300px";
        }
}

function toggleProfilebar() { // script to toggle profile bar off/on
    let profilebar = document.getElementById("profilebar");
    let categoriesbar = document.getElementById("categoriesbar");
    let membersbar = document.getElementById("membersbar");

    // close other bars if they are open
    if (categoriesbar.style.width === "300px") {
        categoriesbar.style.width = "0";
    }
    if (membersbar.style.width === "300px") {
        membersbar.style.width = "0";
    }

    // toggle the profile bar
    if (profilebar.style.width === "300px") {
        profilebar.style.width = "0";
    } else {
        profilebar.style.width = "300px";
    }
}

function createPost(){ //does nothing for now/ placeholder 
    document.getElementById("createpostbox").style.display = "flex";
}

function closePost(){ //does nothing for now/ placeholder 
    document.getElementById("createpostbox").style.display = "none";
}