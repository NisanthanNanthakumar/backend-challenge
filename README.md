# Ada Support Backend Developer Challenge


Hello there! :wave:

This is our challenge for potential new backend developer team members. We'd like to see how you tackle an open-ended project in Ada's domain (chat). We don't mind what language you use to complete the challenge. Feel free to try something new, or to use technology that you're already comfortable with. We're partial to Python here at Ada, but please feel free to use whatever you'd like :smile:

## Installing / Getting started

You will need NodeJS >= 8.1.1

You will need either a local instance of Mongo >= 3.4.13 or a free mLab instance.

Replace 'your-mongoURI-here' with your mongoURI.

```shell
git clone https://github.com/NisanthanNanthakumar/backend-challenge.git

cd backend-challenge

cd server

npm install

cd config

touch dev.js

echo "module.exports = {
  mongoURI:
    'your-mongoURI-here'
};" > dev.js


npm start
```

alternatively for dev, instead of ``` npm start```

```shell
npm install -g nodemon

npm run server
```

## Tests

```shell
npm run tests
```

## Your Quest

We'd like you to design and build a simple web service responsible for two things:

1. Accept incoming chat messages over HTTP
2. Serve up conversation history over HTTP

When you're done, please open a pull request in this repository and we'll take a look! Expect us to give some feedback and ask questions to better understand your thought process.

### Important Notes
- Please don't spend too long on this! Please spend less than 1 working day.
- Please reach out to anson@ada.support and shihan@ada.support if you have any questions whatsoever! This should be fun and not stressful.
- We intentionally left things somewhat ambiguous so that you can be creative. If you'd rather have things specified closely, we can give you more guidance. Just ask!
- Feel free to use any technology and programming language that you'd like

## Specifications

Your solution should start an HTTP service on any port you'd like. Please include instructions on how to start your service (so that we can test the functionality!)

### `/messages/` Resource

The `/messages/` resource accepts HTTP POST actions to create new messages in the conversation. A typical message resource has the format of:

```javascript
{
    "sender": "anson",
    "conversation_id": "1234",
    "message": "I'm a teapot"
}
```

Here, `"sender"` is a string username, `"conversation_id"` is a unique identifier for a particular conversation, and `"message"` is a string message to be logged to a conversation.

### `/conversations/<conversation_id>` Resource

The `/conversations/<conversation_id>` resource accepts an HTTP GET action and returns a list of conversation messages. A typical conversation as the format of:

```javascript
{
    "id": "1234",
    "messages": [
        {
            "sender": "anson",
            "message": "I'm a teapot",
            "created": "2018-01-17T04:50:14.883Z"
        },
        {
            "sender": "david",
            "message": "Short and stout",
            "created": "2018-01-17T04:52:17.201Z"
        }
    ]
}
```

Here, a conversation with two messages is presented.

## Clarifications
- Conversation IDs can follow any format you choose, as long as they are unique!
- Conversations should be persisted, but how you persist them is up to you :smile:
- You can assume that the entities sending incoming chat messages are authenticated and trustworthy (authentication is outside of the scope of this project)
- Don't worry about pagination on the conversations
- Don't worry about a list resource for conversations or messages
- We recommend validating incoming data
- Tests are always a good idea
- Please give us instructions on how to run your service when you open your Pull Request
