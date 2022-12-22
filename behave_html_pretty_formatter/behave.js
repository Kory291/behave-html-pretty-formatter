function collapsible_toggle(id) {
    var elem = document.getElementById(id);
    var visible_display = "block";
    if (id.indexOf("table") >= 0) {
        visible_display = "contents";
    }
    elem.style.display = (elem.style.display == "none" ? visible_display : "none");
};

function collapsible_summary(id) {
    var elem = document.getElementById(id);
    var visible_display = "block";
    elem.style.display = (elem.style.display == "none" ? visible_display : "none");
};


function expander(action, summary_block) {
    var elem = Array.from(document.getElementsByClassName("scenario-capsule"));
    elem = elem.concat(Array.from(document.getElementsByClassName("scenario-header")));
    parent_feature = summary_block.parentElement.parentElement.id
    for(var i = 0; i < elem.length; i++) {
        if (parent_feature != elem[i].parentElement.id){
            continue
        }
        if (action == "expand_all") {
            elem[i].classList.remove("collapse")
        } else if (action == "collapse_all") {
            if (!elem[i].classList.contains("collapse")) {
                elem[i].classList.add("collapse");
            }
        } else if (action == "expand_all_failed") {
            if (!elem[i].classList.contains("passed")) {
                elem[i].classList.remove("collapse");
            } else {
                if (!elem[i].classList.contains("collapse")) {
                    elem[i].classList.add("collapse");
                }
            }
        }
    }

    // changing arrows
    var arrows = Array.from(document.getElementsByClassName("arrow up"));
    arrows = arrows.concat(Array.from(document.getElementsByClassName("arrow down")));
    for(var i = 0; i < arrows.length; i++){
        arrow_parent_scenario = arrows[i].parentElement.parentElement.parentElement.parentElement;
        feature_id = arrow_parent_scenario.parentElement.id;
        if (parent_feature != feature_id){
          continue;
        }
        if (action == "expand_all"){
            arrows[i].className = "arrow down" ;
        }
        else if (action == "collapse_all"){
            arrows[i].className = "arrow up" ;
        } else if (action == "expand_all_failed") {
            if (!arrow_parent_scenario.classList.contains("passed")){
                arrows[i].className = "arrow down" ;
            } else {
                arrows[i].className = "arrow up"
            }
        }
    }
};


function expand_this_only(arrow) {
    scenario = arrow.parentElement.parentElement.parentElement.id
    var elem = Array.from(document.getElementsByClassName("scenario-capsule"));
    elem = elem.concat(Array.from(document.getElementsByClassName("scenario-header")));
    isCollapsed = false;
    for(var i = 0; i < elem.length; i++) {
        if (scenario != elem[i].id){
            continue
        }
        if (!elem[i].classList.contains("collapse")) {
            elem[i].classList.add("collapse");
            isCollapsed = true; 
        } else {
            elem[i].classList.remove("collapse")
        }
    }
    if (isCollapsed){
      arrow.firstElementChild.className = "arrow up"
    } else {
      arrow.firstElementChild.className = "arrow down"
    }
};


function toggle_contrast_for(target_class) {
    var elements = document.getElementsByClassName(target_class);
    for(var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains("contrast")) {
            elements[i].classList.remove("contrast");
        } else {
            elements[i].classList.add("contrast");
        }
    }
};

function toggle_contrast() {
    var step_status_items = document.getElementsByClassName("step-status");
    for (var i=0; i < step_status_items.length; i++) {
        step_status_items[i].style.display = (step_status_items[i].style.display == "block" ? "none" : "block");
    };

    const contrast_classes = [
        "feature-title",
        "feature-summary-container",
        "feature-summary-row",
        "feature-icon",

        "scenario-header",
        "scenario-capsule",
        "scenario-tags",
        "scenario-duration",

        "step-capsule",
        "step-status",
        "step-duration",

        "messages",
        "embed_button",
        "link",
        "table",

    ];
    contrast_classes.forEach(toggle_contrast_for);
};

function detect_contrast() {
    var obj_div = document.createElement("div");
    obj_div.style.color = "rgb(31, 41, 59)"
    document.body.appendChild(obj_div);
    var col = document.defaultView ? document.defaultView.getComputedStyle(obj_div, null).color : obj_div.currentStyle.color;
    document.body.removeChild(obj_div);
    col = col.replace(/ /g, "");
    if (col !== "rgb(31,41,59)") {
        console.log("High Contrast theme detected.")
        toggle_contrast();
    }
}
