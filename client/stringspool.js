import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './stringspool.html';

Template.stringspool.onCreated(function() {

  var colours = [
    {val:'#d0191e', text: 'Red'},
    {val:'#b2f289', text: 'Light Green'},
    {val:'#ac99c6', text: 'Purple'},
    {val:'#168d81', text: 'Teal'},
    {val:'#ffffff', text: 'White'},
    {val:'#000000', text: 'Black'}
  ];

  var firstSize = 0

  Meteor.setTimeout(function() {
    firstSize = $('.js-spool-container').children().length;

    $.each(colours, function(i, colour) {
      $('#user-text-colour').append($("<option>", { value: colour.val, text: colour.text }));
    });
  }, 1000);

  Meteor.setInterval(function() {
    var checkLen = $('.js-spool-container').children().length

    if (firstSize != 0 && firstSize < checkLen) {
      if (($(window).scrollTop() + $(window).height()) > ($(document).height() - 300)) {
      $('html, body').animate({ scrollTop: $('.js-spool-container').height() }, 2000);
      };
      firstSize = checkLen
    }
  }, 300)
});

Template.stringspool.helpers({
  texts() {
    return Strings.find({},{sort:{created_at:1}})
  },
});

Template.stringspool.rendered = function() {
        $('body').on('keypress',function(e) {
          if (e.which === 13) {
            $('html, body').animate({ scrollTop: $(document).height() }, 100);
            $('#user-text').focus();
          }
        });
}

Template.stringspool.events({

  'keyup #user-text'(e) {
    $('#user-show').html($(e.target).val());
    $('#user-text').attr('size', $('#user-text').val().length + 1);
    },

  'keypress #user-text'(e, i) {
    if (e.which === 13) {
      var $user_input = $('#user-text').val();
      var created_at = new Date();
      var $text_colour = $('#user-text-colour').val();
      Strings.insert({text:$user_input,created_at: created_at,colour: $text_colour});
      $('#user-text').val('');
      $('html, body').animate({ scrollTop: $(document).height() }, 1000);
    }
  },
  'click #scroll'(){
    $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
       $(this).stop();
   });
    $('html, body').animate({ scrollTop: $(document).height() }, 3000);
  },

});
