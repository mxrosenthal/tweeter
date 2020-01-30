/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(obj) {
    console.log('obj: ', obj);
    const username = obj.user.name;
    const avatar = obj.user.avatars;
    const handle = obj.user.handle;
    const input = obj.content.text;
    const datePosted = new Date(obj.created_at);
    const currentDate = new Date();
    const timeSince = currentDate - datePosted;
    const secondsSincePost = Math.floor((timeSince / 86400000) * 86400);
    const minutesSincePost = Math.floor((timeSince / 86400000) * 1440);
    const hoursSincePost = Math.floor((timeSince / 86400000) * 24);
    const daysSincePost = Math.floor(timeSince / 86400000); //number of milliseconds per day.
    const yearsSincePost = Math.floor(timeSince / 86400000 / 365);

    const $tweet = $('<article>').addClass('tweet');
    const $header = $('<header>').addClass('posted-tweet-header');
    const $div = $('<div>').addClass('input-tweet-body');
    const $footer = $('<footer>').addClass('posted-tweet-footer');

    if (input.length > 140) {
      return;
    }

    $header.append(`
    <div class="header-logo">
    <img class="avatar-small" src=${avatar} />
    <span class="user-name-small">
    ${username}
    </span>
    </div>
    <span class="user-handle-small">
    ${handle}
    </span>
`);

    $div.append(`${input}`);
    // $footer.append(`Posted: ${daysSincePost} ago.`);

    if (yearsSincePost > 0) {
      $footer.append(`Posted ${yearsSincePost} years ago.
  <div class="glyph">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="far fa-heart"></i>
  </div>`);
    } else if (daysSincePost > 0) {
      $footer.append(`Posted ${daysSincePost} days ago.
    <div class="glyph">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>`);
    } else if (hoursSincePost > 0) {
      $footer.append(`Posted ${hoursSincePost} hours ago.
    <div class="glyph">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>`);
    } else if (minutesSincePost > 0) {
      $footer.append(`Posted ${minutesSincePost} minutes ago.
    <div class="glyph">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>`);
    } else if (secondsSincePost > 0) {
      $footer.append(`Posted ${secondsSincePost} seconds ago.
    <div class="glyph">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>`);
    } else {
      $footer.append(`Posted just now.
    <div class="glyph">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>`);
    }

    $tweet.append($header, $div, $footer);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    const container = $('#tweet-container');
    container.empty();

    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet); //needs to be an obj?
      container.prepend(newTweet);
    }
  };

  // const renderLastTweet = function(tweets) {
  //   const tweet = tweets.slice(-1);
  //   const container = $('#tweet-container');
  //   container.prepend(tweet);
  // };

  //POST tweet TO the SERVER
  const $form = $('#submit-tweet');
  $form.on('submit', function(event) {
    event.preventDefault();
    // console.log('form:', $form.serialize());

    const inputText = $('#newTweetTextArea').val();
    console.log('inputText: ', inputText);
    if (inputText.length > 140) {
      alert('Your message is too long.');
    } else if (inputText.length === 0) {
      alert("Can't submit empty Tweet.");
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $form.serialize(),
        success: data => {
          // $('#tweet-container').prepend(createTweetElement(data));
          loadTweets();
          console.log('data: ', data);
          $('#newTweetTextArea')
            .val('')
            .focus();
          $('.counter').text(140);
        }
      });
    }
  });

  //GET tweet FROM the SERVER
  const loadTweets = function() {
    console.log('loading tweets');
    $.ajax({
      method: 'GET',
      url: '/tweets',
      data: $form.serialize(),
      success: post => {
        renderTweets(post);
      }
    });
  };

  loadTweets();

  $('#double-down').click(function() {
    $('#new-tweet').slideDown('slow');

    $('#newTweetTextArea').focus();
  });
});
