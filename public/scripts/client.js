$(document).ready(function() {
  const createTweetElement = function(obj) {
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
      </span>`);

    //appending input from the
    $div.append(`${input}`);

    //determining time since post to update relative time since post was posted.
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

  //POST tweet TO the SERVER
  const $form = $('#submit-tweet');
  $form.on('submit', function(event) {
    event.preventDefault();

    const inputText = $('#newTweetTextArea').val();
    if (inputText.length > 140) {
      $('#tooLong')
        .slideDown('slow')
        .focus('#newTweetTextArea');
      tooLong = true;
    } else if (inputText.length === 0) {
      $('#noText')
        .slideDown('slow')
        .focus('#newTweetTextArea');
      noText = true;
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $form.serialize(),
        success: data => {
          loadTweets();
          $('#newTweetTextArea')
            .val('')
            .focus();
          $('.counter').text(140);

          //remove error messages.
          $('#tooLong').slideUp('slow');
          tooLong = false;
          $('#noText').slideUp('slow');
          noText = false;
        }
      });
    }
  });

  //GET tweet FROM the SERVER
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      data: $form.serialize(),
      success: post => {
        renderTweets(post);
      }
    });
  };

  loadTweets(); //loads all tweets in memore when you enter the site.

  let tweetBox = false;
  $('#double-down').click(function() {
    if (tweetBox) {
      $('#new-tweet').slideUp('slow'); //if tweetBox is open it will close
      tweetBox = false;

      if (tooLong) {
        //if there are error messages, slide them out of view if newtweet arrow is toggled.
        $('#tooLong').slideUp('slow');
        $('#newTweetTextArea').val('');
        $('.counter').text(140);
      }
      if (noText) {
        $('#noText').slideUp('slow');
      }
    } else {
      $('#new-tweet').slideDown('slow'); //if tweetBox is closed it will open
      $('#newTweetTextArea').focus();
      tweetBox = true;
      //if there are error messages, slide them out of view if newtweet arrow is toggled.
      $('#tooLong').slideUp('slow');
      $('#newTweetTextArea').val('');
      $('.counter').text(140);
      $('#noText').slideUp('slow');
    }
  });
});
