/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  user: {
    name: 'Newton',
    avatars: 'https://i.imgur.com/73hZDYK.png',
    handle: '@SirIsaac'
  },
  content: {
    text: 'If I have seen further it is by standing on the shoulders of giants'
  },
  created_at: 1461116232227
};

const createTweetElement = function(obj) {
  const username = obj.user.name;
  const avatar = obj.user.avatars;
  const handle = obj.user.handle;
  const input = obj.content.text;
  const datePosted = new Date(obj.created_at);
  const currentDate = new Date();
  const timeSince = currentDate - datePosted;
  const daysSincePost = Math.floor(timeSince / 86400000); //number of milliseconds per day.
  const yearsSincePost = Math.floor((timeSince / 86400000) * 365);

  const $tweet = $('<article>').addClass('tweet');
  const $header = $('<header>').addClass('posted-tweet-header');
  const $div = $('<div>').addClass('input-tweet-body');
  const $footer = $('<footer>').addClass('posted-tweet-footer');

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
  } else {
    $footer.append(`Posted ${daysSincePost} days ago.
    <div class="glyph">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>`);
  }

  $tweet.append($header);
  $tweet.append($div);
  $tweet.append($footer);

  return $tweet;
};

const renderTweets = function(tweets) {
  // let arrayOfTweets = [];
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet); //needs to be an obj?
    $('#tweet-container').append(newTweet);
  }
  // $('.tweet-container').append()
  // return arrayOfTweets;
};

const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac'
    },
    content: {
      text:
        'If I have seen further it is by standing on the shoulders of giants'
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd'
    },
    content: {
      text: 'Je pense , donc je suis'
    },
    created_at: 1461113959088
  }
];

const $tweet = createTweetElement(tweetData);

// console.log(renderTweets(data));
// console.log('arrayOfTweets: ', arrayOfTweets);

// Test / driver code (temporary)
// console.log('$tweet:', $tweet); // to see what it looks like

$(document).ready(function() {
  // $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  renderTweets(data);
});
