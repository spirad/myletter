  var myApp = angular.module('spicyApp1', []);

  myApp.controller('SpicyController', ['$scope', function($scope) {
      $scope.spice = 'very';
      $scope.testMessage = 'not yet tested';
      

      $scope.chiliSpicy = function() {
          $scope.spice = 'chili';
      };

      $scope.jalapenoSpicy = function() {
          $scope.spice = 'jalapeño';
      };
      
      $scope.test = function() {
          $scope.testMessage = 'I am a live';
      };
  }]);