angular.module('starter.controllers', [])

 
.controller('ChosenCtrl', ['$scope', 'ContactsService','ContactConditionService', function($scope, ContactsService,ContactConditionService) {

        $scope.data = ContactConditionService.selectedContacts();

        $scope.pickContact = function() {

            ContactsService.pickContact().then(
				function(contact){
					ContactConditionService.success(contact);
				}
				,function(failure) {
					ContactConditionService.fail(failure);
				}
            );

        }


    }])


.controller('ContactNumChooseCtrl', function($scope, $stateParams, ContactConditionService) {
	
	$scope.contact = ContactConditionService.get($stateParams.contactId);
	$scope.keep= function(contact,number){
		ContactConditionService.keep(contact,number);
	};
});
