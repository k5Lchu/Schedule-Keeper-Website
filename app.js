/*global $, jQuery, angular*/
var myApp = angular.module("scheduleApp", []);

function getDaysString(newClass) {
    "use strict";
    var dayString = "";
    if (newClass.mon) {
        dayString += "mo";
    }
    if (newClass.tue) {
        dayString += "tu";
    }
    if (newClass.wed) {
        dayString += "we";
    }
    if (newClass.thu) {
        dayString += "th";
    }
    if (newClass.fri) {
        dayString += "fr";
    }
    return dayString;
}

function getTimes(times) {
    "use strict";
    var startAndEnd = times.split(";");
    var start = startAndEnd[0].split(":");
    var end = startAndEnd[2].split(":");

    return [parseInt(start[0], 10) + ":" + parseInt(start[1], 10) + startAndEnd[1], parseInt(end[0], 10) + ":" + parseInt(end[1], 10) + startAndEnd[3]];
}

myApp.controller("ScheduleController", ["$scope", function ($scope) {
    "use strict";
    $scope.testClasses = [
        {
            name: "Class 1",
            days: "mo we fr",
            strTime: "9:00am",
            endTime: "10:00am",
            loc: "Hall 1",
            webUrl: "https://google.com",
            final: {
                strTime: "1:00pm",
                endTime: "4:00pm",
                date: "03/15/17",
                loc: "Hall 1 Final"
            }
        }, {
            name: "Class 2",
            days: "mo we",
            strTime: "3:00pm",
            endTime: "4:00pm",
            loc: "Hall 2",
            webUrl: "https://yahoo.com",
            final: {
                strTime: "11:00am",
                endTime: "2:00pm",
                date: "03/13/17",
                loc: "Hall 2 Final"
            }
        }
    ];
    $scope.toDoItems = [
        "Get Milk",
        "Do hw1",
        "Sign up for club A",
        "Play Pokemon go"
    ];



    $scope.showAddTodo = false;
    $scope.showAddClass = false;



    $scope.isAdding = function () {
        return $scope.showAddClass || $scope.showAddTodo;
    };
    $scope.todoClick = function () {
        $scope.showAddTodo = true;
    };
    $scope.addClassClick = function () {
        $scope.showAddClass = true;
    };
    $scope.formCancel = function () {
        $scope.newTodoItem = "";
        $scope.newClass = angular.copy({});
        $scope.showAddClass = false;
        $scope.showAddTodo = false;
    };



    $scope.delTodo = function (todo) {
        var toDel = $scope.toDoItems.indexOf(todo);
        $scope.toDoItems.splice(toDel, 1);
    };
    $scope.delClass = function (clss) {
        var toDel = $scope.testClasses.indexOf(clss);
        $scope.testClasses.splice(toDel, 1);
    };
    $scope.addTodo = function () {
        $scope.toDoItems.push($scope.newTodoItem);
        $scope.showAddTodo = false;
        $scope.newTodoItem = "";
    };
    $scope.addClass = function () {
        $scope.testClasses.push({
            name: $scope.newClass.className,
            days: getDaysString($scope.newClass),
            strTime: $scope.newClass.newLecTime.startHr + ":" + $scope.newClass.newLecTime.startMin + $scope.newClass.newLecTime.startAmPm,
            endTime: $scope.newClass.newLecTime.endHr + ":" + $scope.newClass.newLecTime.endMin + $scope.newClass.newLecTime.endAmPm,
            loc: $scope.newClass.lecPlace,
            webUrl: $scope.newClass.web,
            final: {
                strTime: $scope.newClass.newFinTime.startHr + ":" + $scope.newClass.newFinTime.startMin + $scope.newClass.newFinTime.startAmPm,
                endTime: $scope.newClass.newFinTime.endHr + ":" + $scope.newClass.newFinTime.endMin + $scope.newClass.newFinTime.endAmPm,
                date: $scope.newClass.fnlDate,
                loc: $scope.newClass.fnlLoc
            }
        });
        $scope.newClass = angular.copy({});
        $scope.showAddClass = false;
    };
}]);
