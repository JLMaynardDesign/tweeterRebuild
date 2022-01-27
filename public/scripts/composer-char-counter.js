/* eslint-disable no-undef */

$(function() {
  $("#tweet-text").on("input", onInput);
});

const onInput = (event) => {
  const $counter = $(".counter");

  let inputLength = event.target.value.trim().length;
  $counter.html(140 - inputLength);

  if (inputLength > 140) {
    $counter.addClass("red");
  } else {
    $counter.removeClass("red");
  }
};