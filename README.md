# Ada Support Backend Developer Challenge

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

This starts up a local server on port 5000. Navigate to [http://localhost:5000](http://localhost:5000).

Alternatively for dev, instead of ``` npm start```

```shell
npm install -g nodemon

npm run server
```

Local server is still on port 5000. Navigate to [http://localhost:5000](http://localhost:5000).

## Tests

```shell
npm run tests
```

## API Specifications

Your solution should start an HTTP service on any port you'd like. Please include instructions on how to start your service (so that we can test the functionality!)

### `/messages` Resource

**Url** `/api/v1/messages/`

**Method** `Post`

**Data Params** 

```javascript
{
    "sender": "anson",
    "conversation_id": "1234",
    "message": "I'm a teapot"
}
```

Here, `"sender"` is a string username, `"conversation_id"` is a unique identifier for a particular conversation, and `"message"` is a string message to be logged to a conversation.

**Success Response**

Status Code: **201**

```javascript
{
    "conversation_id": "5a9200614cf6352cbf86e39d",
    "message": "Success",
    "description": "Message has been added to conversation thread."
}
```

**Error Response:**

Status Code: **400**

```javascript
{
    "message": "Bad Request",
    "description": ...
}
```

### `/conversations/:conversation_id` Resource

**Url** `/api/v1/converstaions/:conversation_id`

**Method** `Get`

**Data Params** None

**Success Response**

The `/conversations/:conversation_id` route returns a list of conversation messages.

Status Code: **200**

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
Here is a conversation with two messages.

**Error Response:**

Status Code: **400**

```javascript
{
    "message": "Bad Request",
    "description": ...
}
```

### `/conversations` Resource

**Url** `/api/v1/conversations/`

**Method** `Post`

**Data Params** None

**Success Response**

Status Code: **201**

```javascript
{
    "conversation_id": "5a9200614cf6352cbf86e39d",
    "message": "Success",
    "description": "New conversation has been created."
}
```
Here a new conversation thread is created.

**Error Response:**

Status Code: **400**

```javascript
{
    "message": "Bad Request",
    "description": ...
}
```