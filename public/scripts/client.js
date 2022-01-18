/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


    (function ($) {

      const loadTweets = function() {
        $.ajax({
          url: '/tweets',
          type: "GET",
        })
        .done((response) => {
          renderTweets(response);
        })
        .fail((error) => {
          console.error("error", error);
        })
      }
      // Checks whether the avatars property contains an http link or an svg class from one of the project libraries
      const avatarType = function (avatar) {
        const regex = new RegExp("^http");

        if (regex.test(avatar)) {
          return `<img src=${avatar}/>`;
        } else {
          return avatar;
        }
      };

      const createTweetElement = function (tweet) {
        /* Your code for creating the tweet element */
        // ...
        let $tweet = `
  <article class = "tweet-container">
  <header>
  ${obj.user.avatars ? avatarType(obj.user.avatars) : '<i class="fas fa-user-secret fa-2x"></i>'}
  <div class="username">
  ${obj.user.name}
  </div>
  <div class="user-id">
  ${obj.user.handle}
  </div>

  <div class="tweet-content">
  ${obj.content.text}
  </div>

  <footer>
  <div class="date-posted">
  ${timeago.format(obj.created_at)}
  </div>

  <div class="tweet-actions">
  <a href="#"><i class="fas fa-flag"></i></a>
  <a href="#"><i class="fas fa-retweet"></i></a>
  <a href="#"><i class="fas fa-heart"></i></a>
  </div>
  </footer>
  </article>
  `;
        return $tweet;
      };

      const renderTweets = function (tweets) {
        // loops through tweets
        $(`#tweets-container`).empty();
        for (let tweetObj of tweets) {
          // calls createTweetElement for each tweet
          // takes return value and appends it to the tweets container
          const $tweet = createTweetElement(tweetObj);
          $(`#tweets-container`).prepend($tweet);
        }
      };

      $('.new-tweet form').on('submit', function (event) {
        event.preventDefault();
        const $formData = $(this).serialize();
        console.log($formData);

        $.ajax({
          url: '/tweets',
          type: 'POST',
          data: $formData
        })
          .done(() => {
            $(this).children('#tweet-text').val('');
            $(this).parent().siblings('#tweets-container').html('');
            loadTweets();
          })
          .fail((error) => {
            console.error('error:', error)
          })
      });