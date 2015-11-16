describe('Services unit test',function(){   //testing services alone

  beforeEach(module('starter.services'));
  describe('ContactsService',function(){  //testing ContactsService

    var ContactsService;

    beforeEach(inject(function(_ContactsService_){
      ContactsService=_ContactsService_;
    }));

    it('should return in the right format',inject(function(ContactsService){  //tests whether the contact is returned in the specified format
      var contact={
        id:"1",
        name:{
          formatted:"Snyder Beeswax"
        },
        phoneNumbers:["9911223344", "09911223344","+919911223344"]
      };
      var formattedContact={
        "id":"1",
        "displayName":"Snyder Beeswax",
        "phones":["9911223344", "09911223344","+919911223344"]
      };

      expect(ContactsService.format(contact)).toEqual(formattedContact);
    }));
  });
  describe('ContactConditionService',function(){  //testing ContactConditionService

    var ContactConditionService;

    beforeEach(inject(function(_ContactConditionService_){
      ContactConditionService=_ContactConditionService_;
    }));

    it('contact repeats condition',inject(function(ContactConditionService){  //test for a contact repeating
      var contacts=
        [{
          id:"0",
          displayName:"Snyder Beeswax",
          phoneNumbers:["9911223344", "+919911223344"]
        }];
      var contact=
        {
          id:"1",
          displayName:"Snyder Beeswax",
          phoneNumbers:["9911223344" ]
        };

        var flag=ContactConditionService.contactExistanceCheck(contact,contacts,false,contacts.length);

        expect(flag).toBe(true);
      }));

      it('contact has no phone numbers condition',inject(function(ContactConditionService){ //tests if a contact has a phone number or not
        var contact=
          {
            id:"1",
            name:{
              formatted:"Snyder Beeswax"
            },
            phones:[]
          };

          var flag=ContactConditionService.noPhoneNumberCheck(contact);

          expect(flag).toBe(true);
        }));

    });

  });
