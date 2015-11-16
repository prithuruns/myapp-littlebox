
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  //tab-chosencontacts is the tab showing all the chosen contacts and also allows
  //users to select one phone number , if a contact has multiple of them

  .state('tab.chosencontacts', {
      url: '/chosencontacts',
      views: {
        'tab-chosencontacts': {
          templateUrl: 'templates/tab-chosencontacts.html',
          controller: 'ChosenCtrl'
        }
      }
    })

   //tab-contact-chooseNum allows the user to choose a particular number for a contact

    .state('tab.contact-chooseNum', {
      url: '/chosencontacts/:contactId',
      views: {
        'tab-chosencontacts': {
          templateUrl: 'templates/contact-chooseNum.html',
          controller: 'ContactNumChooseCtrl'
        }
      }
    });


  // if none of the above states are matched, this is the fallback state
  $urlRouterProvider.otherwise('/tab/chosencontacts');

});
