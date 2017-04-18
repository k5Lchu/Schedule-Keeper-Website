/*global $, jQuery*/

$("#addTodo").on("click", function () {
    "use strict";
    $("#formBackground").show();
    $("#addNewTodo").show();
});

$("#addClass").on("click", function () {
    "use strict";
    $("#formBackground").show();
    $("#addNewClass").show();
});

$("#addNewTodo").on("submit", function () {
    "use strict";
    $("input[type=text]").val("");
    $(this).hide();
    $("#formBackground").hide();
});

$("#addNewClass").on("submit", function () {
    "use strict";
    $("input[type=text]").val("");
    $("input[type=checkbox]").prop("checked", false);
    $(this).hide();
    $("#formBackground").hide();
});

$(".cancel").on("click", function () {
    "use strict";
    $("input[type=text]").val("");
    $("input[type=checkbox]").prop("checked", false);
    $(this).parent().hide();
    $("#formBackground").hide();
});
