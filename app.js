/*global $, jQuery, angular*/
var myApp = angular.module("scheduleApp", []);

function getDaysString($scope) {
    "use strict";
    var dayString = "";
    if ($scope.mon) {
        dayString += "mo";
    }
    if ($scope.tue) {
        dayString += "tu";
    }
    if ($scope.wed) {
        dayString += "we";
    }
    if ($scope.thu) {
        dayString += "th";
    }
    if ($scope.fri) {
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
    };
    $scope.addClass = function () {
        $scope.testClasses.push({
            name: $scope.className,
            days: getDaysString($scope),
            strTime: $scope.newLecTime.startHr + ":" + $scope.newLecTime.startMin + $scope.newLecTime.startAmPm,
            endTime: $scope.newLecTime.endHr + ":" + $scope.newLecTime.endMin + $scope.newLecTime.endAmPm,
            loc: $scope.lecPlace,
            webUrl: $scope.web,
            final: {
                strTime: $scope.newFinTime.startHr + $scope.newFinTime.startMin + $scope.newFinTime.startAmPm,
                endTime: $scope.newFinTime.endHr + $scope.newFinTime.endMin + $scope.newFinTime.endAmPm,
                date: $scope.fnlDate,
                loc: $scope.fnlLoc
            }
        });
    };
}]);
