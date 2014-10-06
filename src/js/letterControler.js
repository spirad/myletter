/**
 * AngularJS module to process a form.
 */
var myApp = angular.module('myLetter', []);

myApp.config( [ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/letter', {
		templateUrl : './letter.html',
		controller : 'letterController'
	}).when('/home', {
		templateUrl : './intro.html',
		controller : 'letterController'
	}).when('/pdfView', {
		templateUrl : './pdfView',
		controller : 'letterController'
	}).when('/download', {
		templateUrl : './download.html',
		controller : 'letterController'
	}).when('/', {
			templateUrl : './intro.html',
		controller : 'letterController'
	}).otherwise( {
		redirectTo : './intro.html'
		//controller : 'letterController'
	});
} ]);


myApp.factory('Address', [
		'$http',
		function($http) {
			function Address(addressData) {
				this.setData(addressData);
				// this.addressId=addressData.name.toLowerCase()+"_"+addressData.firstName.toLowerCase();
			}

			Address.prototype = {

				setData : function(addressData) {
					// this.id=addressData.lastName;
					angular.extend(this, addressData);
					// .toLowerCase();//+"_"+this.firstName.toLowerCase();
				},

				setId : function(_id) {
					angular.extend(this, {
						id : _id
					});
				},
				load : function(id) {
					var scope = this;
					$http.get('ourserver/addressData/' + addressId).success(
							function(addressData) {
								scope.setData(addressData);
							});
				},
				update : function() {
					var _id = this.lastName.toLowerCase() + "_"
							+ this.firstName.toLowerCase();
					;
					angular.extend(this, {
						id : _id
					});
					$http.post('myLetter/address/', this);
				}

			};
			return Address;
		} ]);

myApp.factory('Letter', [
		'$http','$location',
		function($http,$location) {
			function Letter(letterData) {
				this.setData(letterData);
				// this.addressId=addressData.name.toLowerCase()+"_"+addressData.firstName.toLowerCase();
			}

			Letter.prototype = {

				//pdfWaterSing ="";
				
				setData : function(letterData) {
					// this.id=addressData.lastName;
					angular.extend(this, letterData);
					// .toLowerCase();//+"_"+this.firstName.toLowerCase();
				},

				update : function() {
					// var
					// _id=this.lastName.toLowerCase()+"_"+this.firstName.toLowerCase();;
					var _id = this.topic;
					var retData = "no response";
					angular.extend(this, {
						id : _id
					});
					$http.post('myletter', this).success(
							function(data, status, headers, config) {
								retData= data;
								$location.path("/pdfView")
								// this callback will be called asynchronously
								// when the response is available
							}).error(function(data, status, headers, config) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
					});
					return retData;
					
				}

			};
			return Letter;
		} ]);

myApp.controller('letterController', [ '$scope', '$location', 'Address', 'Letter',
		function($scope, $location, Address, Letter) {

			$scope.testResult = "not yet tested!";

//			$scope.sender = new Address( {
//				id : $scope.id,
//				lastName : $scope.lastName,
//				firstName : $scope.firstName,
//				street : $scope.street,
//				plz : $scope.location,
//				location : $scope.location
//			});
			
			$scope.sender = new Address( {
				id : $scope.id,
				lastName : "Mustermann",
				firstName : "Monika",
				street : "Musterstrasse 11",
				plz : "11111",
				location : "Musterhausen"
			});

			$scope.receiver = new Address( {
				id : $scope.id,
				lastName : $scope.lastName,
				firstName : $scope.firstName,
				street : $scope.street,
				plz : $scope.location,
				location : $scope.location
			});

			$scope.letter = new Letter( {
				id : $scope.id,
				sender : $scope.sender,
				receiver : $scope.receiver,
				salutation : $scope.salutation,
				topic : $scope.topic,
				text : $scope.topic
				//pdfWaterSign: ""
			});

			$scope.showPDFWaterSign = function showPDFWaterSign() {

				// progressApp.showPleaseWait();
				$scope.letter.update();
				
				
				//console.log($scope.letter.pdfWaterSign)
			},
			
			$scope.sponsors=[{id:0,'name':'SAP', "img":"images/SAP.png", "url":"http://www.sap.com"}, 
			                 {id:1,'name':'Aldi', "img":"images/aldi.png", "url":"http://www.aldi.com"},
			                 {id:2,'name':'Lufthansa', "img":"images/lufthansa.jpg", "url":"http://www.lufthansa.com"},
			                 {id:3,'name':'Beathe Uhse', "img":"images/BU.png", "url":"http://www.beatheuse.com"}
			                 ];

			$scope.startbrowser = function startbrowser(id) {
				console.log("starting browser for " + $scope.sponsors[id].url);
				window.open($scope.sponsors[id].url);
			};
		} ]);
//
// ProgressApp = function () {
// var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog"
// data-backdrop="static" data-keyboard="false"><div
// class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div
// class="progress progress-striped active"><div class="bar" style="width:
// 100%;"></div></div></div></div>');
// return {
// showPleaseWait: function() {
// pleaseWaitDiv.modal();
// },
// hidePleaseWait: function () {
//            pleaseWaitDiv.modal('hide');
//        }
//
//    };
//};
