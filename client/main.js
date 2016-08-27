import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.userinput.onCreated(function OnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  //
  // $('#user-form input[type="text"]').keyup(function(e) {
  //   $('#user-text').html($(this).val());
  // });

});

Template.userinput.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.userinput.events({
  // 'click #first_button'(event, instance) {
  //   // increment the counter when button is clicked
  //   instance.counter.set(instance.counter.get() + 50);
  // },

  'keyup #user-text': function(e) {
    $('#user-show').html($(e.target).val());
  }

});
