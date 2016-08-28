import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './stringspool.html';

Template.stringspool.onCreated(function() {
  Meteor.setInterval(function() {
    $('#user-text').focus()
    // var spool = document.getElementsByClassName('spool-container')
    // var isScrolledToBottom = spool.scrollHeight - spool.clientHeight <= spool.scrollTop + 1;
    // if(isScrolledToBottom)
    // spool.scrollTop = spool.scrollHeight - spool.clientHeight;
  }, 500);
});

Template.stringspool.helpers({
  texts() {
    return Strings.find({},{sort:{created_at:1}})
  },
});

Template.stringspool.events({

  'keyup #user-text'(e) {
    $('#user-show').html($(e.target).val());
    $('#user-text').attr('size', $('#user-text').val().length + 1);
  },
  'keypress #user-text'(e, i) {
    if (e.which === 13) {
      e.preventDefault();
      var $user_input = $('#user-text').val();
      var created_at = new Date();
      Strings.insert({text:$user_input,created_at: created_at ,color:'black'});
      $('#user-text').val('')
      
    }
  }


});
