/**
 * AngularJS module to process a form.
 */
var myApp = angular.module('myLetter', []);

myApp.factory('Address', [ '$http' , function($http) {
	function Address(addressData) {
		this.setData(addressData);
		//this.addressId=addressData.name.toLowerCase()+"_"+addressData.firstName.toLowerCase();
	}

	Address.prototype = {
		
		setData : function(addressData) {
			//this.id=addressData.lastName;
			angular.extend(this, addressData);
			//.toLowerCase();//+"_"+this.firstName.toLowerCase();
		},
		
		setId: function(_id) {		
			angular.extend(this, {id:_id});
		},	
		load : function(id) {
			var scope = this;
			$http.get('ourserver/addressData/' + addressId).success(
					function(addressData) {
						scope.setData(addressData);
					});
		},
		update : function() {
			var _id=this.lastName.toLowerCase()+"_"+this.firstName.toLowerCase();;
			angular.extend(this, {id:_id});
			$http.post('myLetter/address/', this);
		}

	};
	return Address;
}]);

myApp.factory('Letter', [ '$http' , function($http) {
	function Letter(letterData) {
		this.setData(letterData);
		//this.addressId=addressData.name.toLowerCase()+"_"+addressData.firstName.toLowerCase();
	}

	Letter.prototype = {
		
		setData : function(letterData) {
			//this.id=addressData.lastName;
			angular.extend(this, letterData);
			//.toLowerCase();//+"_"+this.firstName.toLowerCase();
		},
		
//		setId: function(_id) {		
//			angular.extend(this, {id:_id});
//		},	
//		load : function(id) {
//			var scope = this;
//			$http.get('ourserver/addressData/' + addressId).success(
//					function(addressData) {
//						scope.setData(addressData);
//					});
//		},
		update : function() {
			//var _id=this.lastName.toLowerCase()+"_"+this.firstName.toLowerCase();;
			var _id=this.topic;
			angular.extend(this, {id:_id});
			$http.post('myLetter/letter/', this);
		}

	};
	return Letter;
}]);

myApp.controller('letterController', [ '$scope', 'Address', 'Letter',
		function($scope, Address, Letter) {
	
			//$scope.id = "not defined";

			$scope.testResult = "not yet tested!";
			
			$scope.sender = new Address({
				id : $scope.id,
				lastName : $scope.lastName,
				firstName : $scope.firstName,
				street: $scope.street,
				plz: sender.location,
				location: sender.location,
			});
			
			$scope.receiver = new Address({
				id : $scope.id,
				lastName : $scope.lastName,
				firstName : $scope.firstName,
				street: $scope.street,
				plz: sender.location,
				location: sender.location,
			});
			
			$scope.letter = new Letter({
				id : $scope.id,
				sender : $scope.sender,
				receiver : $scope.receiver,
				salutation: $scope.salutation,
				topic: $scope.topic,
				text: $scope.topic,
			});
		

		} ]);
