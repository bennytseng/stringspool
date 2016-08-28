import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {

var removeAllPosts = (function() {
    if (Meteor.isServer) {

    Meteor.startup(function() {

      return Meteor.methods({

        removeAllPosts: function() {

          return Posts.remove({});

        }

      });

    });

    }
  });

});
