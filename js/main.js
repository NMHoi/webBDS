var jsonData;

function processPopUpContent(product) {

    for (var i = 0; i < jsonData.project.length; i++) {
        console.log(jsonData.project[i].name == product);
        if (jsonData.project[i].name == product) {
            var node = document.getElementById('canhoskycentertap1');
            node.innerHTML = jsonData.project[i].data[0].info[0].text;
            node = document.getElementById('canhoskycentertap2');
            node.innerHTML = jsonData.project[i].data[0].position[0].text;
            node = document.getElementById('canhoskycentertap3');
            node.innerHTML = jsonData.project[i].data[0].services[0].text;
            node = document.getElementById('canhoskycentertap4');
            node.innerHTML = jsonData.project[i].data[0].flat[0].text;
            node = document.getElementById('canhoskycentertap5');
            node.innerHTML = jsonData.project[i].data[0].galary[0].text;
            break;
        }
    };
    console.log($("[data-rel='lightbox']"));
}


function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        jsonData = JSON.parse(response);
        console.log(jsonData);
        // processPopUpContent("");

    });
}

jQuery(document).ready(function($) {

    'use strict';


    /************** Toggle *********************/
    // Cache selectors
    var lastId,
        topMenu = $(".menu-first, .menu-responsive"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });



    $(window).scroll(function() {
        $('.main-header').toggleClass('scrolled', $(this).scrollTop() > 1);
    });



    $('a[href="#top"]').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });


    $('.flexslider').flexslider({
        slideshow: true,
        slideshowSpeed: 3000,
        animation: "fade",
        directionNav: false,
    });


    $('.toggle-menu').click(function() {
        $('.menu-responsive').slideToggle();
        return false;
    });

    
    /************** LightBox *********************/
    $(function() {
        init();
        $("[data-rel='lightbox']").lightbox();
    });

    /************* READ DATA *********************/
});
