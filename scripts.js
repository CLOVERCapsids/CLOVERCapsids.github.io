// IMPORTANT: consult these docs
// lodash: https://lodash.com/docs/4.17.15
// jquery: https://api.jquery.com/
  
$(document).ready(function() {
    function clear_list(which_list, add_option) {
        if (add_option === true) {
            $("#list"+which_list).empty();
            $("#list"+which_list).append("<option value='-' disabled selected>Choose an option</option>");
        }
        else {
            $("#list"+which_list).empty();
        }
    }

    function clear_lists(start_list) {
        var next_list = start_list+1;
        if ($("#list"+next_list).length > 0) {
            clear_list(start_list, true);
            clear_lists(next_list);
        } else {
            clear_list(start_list, false);
        }
    }

    function set_options_list(which_list, items) {
        _.map(items, function(item) {
  
            var option = document.createElement("option");
            $(option).addClass("item-button"+which_list).html(item[0]);
            $(option).data("items", item[1]);
            
            $("#list"+which_list).on("change", function() {
                var selectedOption = $("option:selected", this);
                set_list_generic(which_list+1, $(selectedOption).data("items"));
        });
  
        $("#list"+which_list).append(option);
      });
    }

    function set_li_list(which_list, items) {
        console.log(items);
        _.map(items, function (item) {
            var element = document.createElement("li");
            $(element).html(item);
            $("#list"+which_list).append(element);
            var description_elm = document.createElement("div");
            var descriptions = get_description(item);
            descriptions.forEach(function (description) {
                $(description_elm).append(description);
                $(description_elm).append("<br>")
            })
            $("#list"+which_list).append(description_elm);
            $("#list"+which_list).append("<br>");
        });
        $("#last").css("color", "black");
        $("#list"+which_list).append(document.createElement("br"));
    }

    function set_list_generic(which_list, items) {
        if (items.length === 0) {
            return;
        }
        clear_lists(which_list);
        if (Array.isArray(items[0])) {
            set_options_list(which_list, items);
        }
        else {
            set_li_list(which_list, items);
        }
    }
  
    function get_description(text) {
        var descriptions = [];
        Object.keys(capsid_descriptions).forEach(function (capsid) {
            if (text.toLowerCase().includes(capsid.toLowerCase())) {
                capsid_descriptions[capsid].forEach(function (description) {
                    var new_link = document.createElement("a");
                    new_link.setAttribute("href", description[1]);
                    $(new_link).html(description[0]);
                    descriptions.push(new_link);
                });
            }
        });
        return descriptions;
    }

    $("#clear").on("click", function() {
        $(".item-button1").css("background-color", "white");
        $("#last").css("color", "white");
        var first_list = 1;
        clear_lists(first_list);
        set_list_generic(first_list, capsid_selections)

    });

    set_list_generic(1, capsid_selections);
});