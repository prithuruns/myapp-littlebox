angular.module('starter.services', [])
//module for the starter app containing all the services

//service to retrieve contacts formt he phone contact-book.
.service("ContactsService", ['$q', function($q) {


//format for the contacts to be in when they are returned
  var formatContact = function(contact) {
    var Contact={
      "id"	       		: contact.id,
      "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
      "phones"        : contact.phoneNumbers || []
    };
    return Contact;
  };

// function to pick contacts from the phone book
  var pickContact = function() {

    var deferred = $q.defer();

    if(navigator && navigator.contacts) { // to make sure that the phone book exists in the device

      navigator.contacts.pickContact(function(contact){

        deferred.resolve( formatContact(contact) );
      });

    } else {
      deferred.reject("?? COULD NOT FIND ANY CONTACTS!");
    }

    return deferred.promise;
  };

  return {
    format:formatContact,
    pickContact : pickContact
  };
}])

//service to perform all the necessary condition checks and add the contact to the backend using respective APIs
.service('ContactConditionService', function() {


    var selectedContacts=[];

    var contactExistanceCheck=function(contact,contacts,flagContactExists,length){  //to check whether the contact already exists, and if so, sets the flag to true
      for(i=0;i<length;i++)
      {
        if(contacts[i].displayName==contact.displayName)
        {
          console.log("Contact repeats.");
          alert("Error:The contact has already been chosen.");
          flagContactExists=true;
          break;
        }
      }
      return flagContactExists;
    }

    var noPhoneNumberCheck=function(contact){ // to check whether the contact has a phone number , and if so, sets the flag to true
      if(contact.phones.length<1)
      {
        console.log("Contact does not have a phone number.");
        alert("Contact could not be added because he/she does not have a phone number.");
        return flagContactPhone=true;
      }
    }

    var showSelectedContacts = function(flagContactExists,flagContactPhone,contact){  // adds the contact to the backend
      if(!flagContactExists&&!flagContactPhone)
      {
        selectedContacts.push(contact);
        console.log("Selected contacts=");
        console.log(JSON.stringify(selectedContacts));
      }
    }

    var success=function(contact) { // success callback function in case the user returns fromt he phone book after picking a contact
      var flagContactPhone=false;
      flagContactPhone=noPhoneNumberCheck(contact);

      if(selectedContacts.length>0)
      {

        var length=selectedContacts.length;
        var flagContactExists=false;

        flagContactExists=contactExistanceCheck(contact,selectedContacts,flagContactExists,length);
        showSelectedContacts(flagContactExists,flagContactPhone,contact);
      }
      else{
        selectedContacts.pop();
        showSelectedContacts(false,flagContactPhone,contact); // false, because, in the case where this is the first user,
                                                              // the contact will not have a chance of being repeated
      }
    }

    var fail=function(failure) {  // callback function in case of failure of choosing a contact
      console.log("Could not pick a contact");
    }

    var allSelectedContacts = function(){ // returns the contacts form the backend
      return selectedContacts;
    }

    var get = function(contactId) { // retireves a selected contact based on the contactid
      for (i=0;i<selectedContacts.length;i++){
        if(parseInt(selectedContacts[i].id)===parseInt(contactId)){
          return selectedContacts[i];
        }
      }
      return null;
    }

    var keep = function(contact,number){    // keeps the specified phone number of a contact.
      for (i=0;i<selectedContacts.length;i++){
        if(parseInt(selectedContacts[i].id)===parseInt(contact.id)){

          selectedContacts[i].phones=[number];
          console.log(JSON.stringify(selectedContacts[i]));
          console.log(JSON.stringify(number));
        }
      }
    }



  return {
    contactExistanceCheck:contactExistanceCheck,
    noPhoneNumberCheck:noPhoneNumberCheck,
    showSelectedContacts:showSelectedContacts,
    success : success,
    fail:fail,
    allSelectedContacts:allSelectedContacts,
    get:get,
    keep:keep
  };
});
