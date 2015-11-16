angular.module('starter.controllers', [])
//module for the starter app containing all the controllers

//controller for the tab showing chosen contacts
.controller('ChosenCtrl', ['$scope', 'ContactsService','ContactConditionService', function($scope, ContactsService,ContactConditionService) {

  $scope.data = ContactConditionService.allSelectedContacts();

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
// controller for the tab showing the number to choose for a particular contact

.controller('ContactNumChooseCtrl', function($scope, $stateParams, ContactConditionService) {

  $scope.contact = ContactConditionService.get($stateParams.contactId);
  $scope.keep= function(contact,number){
    ContactConditionService.keep(contact,number);
  };
});
