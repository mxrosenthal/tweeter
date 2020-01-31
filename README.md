# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Do you have any thoughts you'd like to put on the internet? Write them down in the 'Compose Tweet' area. Hitting Tweet will send a POST request with ajax and jQuery and you'll see the post online in real time without having to refresh the page!

## Dependencies

- Express
- Node 5.10.x or above
- Body-parser
- md5
- Chance

## Final Product

!["Screen shot of header in desktop viewport."](https://github.com/mxrosenthal/tweeter/blob/master/docs/desktop.png?raw=true)
!["Screen shot of header in tablet viewport."](https://github.com/mxrosenthal/tweeter/blob/master/docs/Header%20Tablet.png?raw=true)
!["Error: Can't submit empty tweet."](https://github.com/mxrosenthal/tweeter/blob/master/docs/empty%20error.png?raw=true)
!["Error: Tweet contains too many characters."](https://github.com/mxrosenthal/tweeter/blob/master/docs/tooLongError.png?raw=true)
!["Tweets from our users!"](https://github.com/mxrosenthal/tweeter/blob/master/docs/tweets.png?raw=true)

The screen shots above depict the header of the app in desktop and tablet view, some common error messages you'll run into, as well as some great Tweets from our current users!

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.
5. Toggle the drop down arrow in the Nav to open the new tweet text area.
6. Post your thoughts to the internet as long as they are within 140 characters.
