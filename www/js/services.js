angular.module('starter.services', [])

.service("ContactsService", ['$q', function($q) {

        var formatContact = function(contact) {

            return {
				"id"			: contact.id,
                "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
                "phones"        : contact.phoneNumbers || []
            };

        };

        var pickContact = function() {

            var deferred = $q.defer();

            if(navigator && navigator.contacts) {

                navigator.contacts.pickContact(function(contact){

                    deferred.resolve( formatContact(contact) );
                });

            } else {
                deferred.reject("?? COULD NOT FIND ANY CONTACTS!");
            }

            return deferred.promise;
        };

        return {
            pickContact : pickContact
        };
    }])

.service('ContactConditionService', function() {
  // Might use a resource here that returns a JSON array

				var selectedContacts=[];
				
				var success=function(contact) {
					var flagContactPhone=false;
					if(selectedContacts.length>0)
					{
						var length=selectedContacts.length;
						var flagContactExists=false;
						
						for(i=0;i<length;i++)
						{
							console.log("Enter for " +i+ " time.");
							if(selectedContacts[i].displayName===contact.displayName)
							{
								console.log("Contact repeats.");
								alert("Error:The contact has already been chosen.");
								flagContactExists=true;
								break;
							}
							
							if(contact.phones.length<1)
							{
								console.log("Contact does not have a phone number.");
								alert("Contact could not be added because he/she does not have a phone number.");
								flagContactPhone=true;
								break;
							}
								
						}
						if(!flagContactExists&&!flagContactPhone)
						{
							selectedContacts.push(contact);
							console.log("Selected contacts=");
							console.log(JSON.stringify(selectedContacts));
						}						
					}
					else{
						if(contact.phones.length<1){
							console.log("Contact does not have a phone number.");
							alert("Contact could not be added because he/she does not have a phone number.");
							flagContactPhone=true;
						}
						if(!flagContactPhone){
							selectedContacts.push(contact);
							console.log("Selected contacts=");
							console.log(JSON.stringify(selectedContacts));
						}
					}
                }
				
				var fail=function(failure) {
                    console.log("Could not pick a contact");
                }
				
				return {
					success : success,
					fail:fail,
					selectedContacts: function(){
						return selectedContacts;
					},
					get: function(contactId) {
						for (i=0;i<selectedContacts.length;i++){
							if(parseInt(selectedContacts[i].id)===parseInt(contactId)){
								return selectedContacts[i];
							}
						}
						return null;
					},
					keep: function(contact,number){
						for (i=0;i<selectedContacts.length;i++){
							if(parseInt(selectedContacts[i].id)===parseInt(contact.id)){
								
								selectedContacts[i].phones=[number];
								console.log(JSON.stringify(selectedContacts[i]));
								console.log(JSON.stringify(number));
							}
						}
					}
				};
});

