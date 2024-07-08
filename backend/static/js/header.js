$(document).ready(function() {
    $(".arrow").click(function() {
        let arrowParent = $(this).parent().parent();
        arrowParent.toggleClass("showMenu");
    });
    let localStorageKey = "sidebarState";
    let initialState = localStorage.getItem(localStorageKey);
    let sidebar = $(".sidebar");
    let sidebarBtn = $("#arrowbutton");
    let hamburgerBtn = $("#hamburger");
    let contentPage = $(".content-page");
    let footer = $(".footer");
    let isexpanded = false;
    let menutoggle = $("#menutoggle");
    let shiftmenu = false;
    let wrapperElement = $("#wrapper");

    if (initialState === "open") {
        sidebar.removeClass("close");
        wrapperElement.removeClass("close");
        contentPage.css("margin-left", "240px");
        footer.css("margin-left", "0px");
        isexpanded = true;
        menutoggle.css("margin-left", "250px");
        shiftmenu = true;
    } else {
        sidebar.addClass("close");
        wrapperElement.addClass("close");
        contentPage.css("margin-left", "70px");
        footer.css("margin-left", "-161px");
        isexpanded = false;
        menutoggle.css("margin-left", "80px");
        shiftmenu = false;
    }

    sidebarBtn.click(function() {
        sidebar.toggleClass("close");
        wrapperElement.toggleClass("close");
        if (isexpanded) {
            localStorage.setItem(localStorageKey, "close");
            contentPage.css("margin-left", "70px");
            footer.css("margin-left", "-161px");
            isexpanded = false;
        } else {
            localStorage.setItem(localStorageKey, "open");
            contentPage.css("margin-left", "240px");
            footer.css("margin-left", "0px");
            isexpanded = true;
        }
        if (shiftmenu) {
            menutoggle.css("margin-left", "80px");
            shiftmenu = false;
        } else {
            menutoggle.css("margin-left", "250px");
            shiftmenu = true;
        }
    });

    hamburgerBtn.click(function() {
        sidebar.toggleClass("close");
        wrapperElement.toggleClass("close");
        if (isexpanded) {
            contentPage.css("margin-left", "70px");
            isexpanded = false;
        } else {
            contentPage.css("margin-left", "240px");
            isexpanded = true;
        }
        if (shiftmenu) {
            menutoggle.css("margin-left", "80px");
            shiftmenu = false;
        } else {
            menutoggle.css("margin-left", "250px");
            shiftmenu = true;
        }
    });
});