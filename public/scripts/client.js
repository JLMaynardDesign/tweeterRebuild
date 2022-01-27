/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
  })
    .then((response) => {
      renderTweets(response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

// Checks whether the avatars property contains an http link or an svg class from one of the project libraries
const avatarType = function (avatar) {
  const regex = new RegExp("^http");

  if (regex.test(avatar)) {
    return `<img src=${avatar}/>`;
  } else {
    return avatar;
  }
};

const createTweetElement = function (obj) {
  /* Your code for creating the tweet element */
  // ...
  let $tweet = `
  <article class = "tweet-container">
  <header>
  ${
    obj.user.avatars
      ? avatarType(obj.user.avatars)
      : '<i class="fas fa-user-secret fa-2x"></i>'
  }
  <div class="username">
  ${obj.user.name}
  </div>
  <div class="user-id">
  ${obj.user.handle}
  </div>
  </header>

  <div class="tweet-content">
  ${escape(obj.content.text)}
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
  $(`#tweet-container`).empty();
  for (let tweetObj of tweets) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $tweet = createTweetElement(tweetObj);
    $(`#tweet-container`).prepend($tweet);
  }
};
// $(".new-tweet form").on("submit", function (e) {
const submitTweetPost = function (event) {
  event.preventDefault();
  const $inputField = $(this).find("#tweet-text").val();
  $("#error-blank").slideUp();
  $("#error-exceed").slideUp();

  if ($inputField.length < 1) {
    $("#error-blank").slideDown();
  } else if ($inputField.length > 140) {
    $("#error-exceed").slideDown();
  } else {
    let $formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $formData,
    })
      .then(() => {
        loadTweets();
        $(this).children("#tweet-text").val("");
        $(this).parent().siblings(".counter").html("140");
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }
};

loadTweets();

$(function () {
  console.log("document is ready");
  $("form.tweetSubmit").on("submit", submitTweetPost);
});
