/*global $, jQuery, angular, alert*/

// setup up module for angular app
var myApp = angular.module("scheduleApp", []);

// returns the string that will get stored with the class object
// to keep track of what days the new class si asscociated with
// newClass input is object that holds the booleans for each day
function getDaysString(newClass) {
    "use strict";
    var dayString = "";

    // series of values that will append to the string if the day
    // is asscoiated with the new class
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

// define angualr controller
myApp.controller("ScheduleController", ["$scope", function ($scope) {
    "use strict";

    // testClasses data for test database
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

    // test todo list for test database
    $scope.toDoItems = [
        "Get Milk",
        "Do hw1",
        "Sign up for club A",
        "Play Pokemon go"
    ];

    $scope.hrs = {
        empty: "",
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
        ten: "10",
        eleven: "11",
        twelve: "12"
    };

    $scope.minutes = {
        empty: "",
        zero: "00",
        half: "20",
        hour: "50"
    };

    $scope.days = {
        monday: {
            name: "Monday",
            value: "mon"
        },
        tuesday: {
            name: "Tuesday",
            value: "tue"
        },
        wednesday: {
            name: "Wednesday",
            value: "wed"
        },
        thursday: {
            name: "Thursday",
            value: "thu"
        },
        friday: {
            name: "Friday",
            value: "fri"
        }
    };

    // set the forms to be hidden (connected with ng-show)
    $scope.showAddTodo = false;
    $scope.showAddClass = false;

    // inital values for form validation purposes
    // used in noDaysSelected()
    $scope.newClass = {
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false
    };


    // fucntion to test if someone is adding a new class or todo
    $scope.isAdding = function () {
        return $scope.showAddClass || $scope.showAddTodo;
    };

    // ng-click method when add task button on todo list is clicked
    $scope.todoClick = function () {
        // display the add new todo item form
        $scope.showAddTodo = true;
    };

    // ng-click method when add class button on classes area is clicked
    $scope.addClassClick = function () {
        // display the add new class form
        $scope.showAddClass = true;
    };

    // ng-click method for when someone decides to cancel the form
    // for a new todo of new class item
    $scope.formCancel = function () {
        // reset all form inputs to empty
        // and close both forms
        $scope.newTodoItem = "";
        $scope.newClass = angular.copy({});
        $scope.showAddClass = false;
        $scope.showAddTodo = false;
    };

    // ng-click method for when the x button is clicked on a todo item
    // and will delete that todo item from database
    $scope.delTodo = function (todo) {
        var toDel = $scope.toDoItems.indexOf(todo);
        $scope.toDoItems.splice(toDel, 1);
    };

    // ng-click mathod for when x button is clicked on a class item
    // and will delete the class from the database
    $scope.delClass = function (clss) {
        var toDel = $scope.testClasses.indexOf(clss);
        $scope.testClasses.splice(toDel, 1);
    };

    // ng-submit method when new todo item form is completed and submitted
    // adds new todo item to the database and resets form field to empty
    // while also closing the form
    $scope.addTodo = function () {
        $scope.toDoItems.push($scope.newTodoItem);
        $scope.showAddTodo = false;
        $scope.newTodoItem = "";
    };

    // ng-submit method when new class form os cimpleted and submitted
    // normal form validation in place for all inputs in form except
    // the checkboxes for lecture days
    $scope.addClass = function () {
        // if no days are selected for the lecture schedule
        // display an alert box and do not continue the submit
        if ($scope.noDaysSelected()) {
            alert("Please check at least one of the day boxes.");
        } else {
            // if form complete, create a new class object and push to the database
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
            // reset form inputs to empty fields and close the form
            $scope.newClass = angular.copy({});
            $scope.showAddClass = false;
        }
    };

    // function to check if the user has not selected at least one day for the new class lecture
    $scope.noDaysSelected = function () {
        if ($scope.newClass.mon || $scope.newClass.tue || $scope.newClass.wed || $scope.newClass.thu || $scope.newClass.fri) {
            return false;
        }
        return true;
    };
}]);
