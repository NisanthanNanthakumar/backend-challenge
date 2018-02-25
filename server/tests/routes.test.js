const request = require("supertest");
const app = require("../app");

describe("API tests", () => {
  let id;

  describe("POST /api/v1/conversations - create a new conversation thread", () => {
    it("should create a new conversation with an empty req.body", () => {
      return request(app)
        .post("/api/v1/conversations")
        .send({})
        .then(res => {
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe("Success");
          expect(res.body.conversation_id).toBeTruthy();
          return res;
        })
        .then(res => (id = res.body.conversation_id));
    });

    it("should create a new conversation with a random req.body", () => {
      return request(app)
        .post("/api/v1/conversations")
        .send({ orange: "orange", async: "await" })
        .then(res => {
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe("Success");
          expect(res.body.conversation_id).toBeTruthy();
        });
    });
  });

  describe("POST /api/v1/messages - create a new message", () => {
    it("should create a new message", () => {
      return request(app)
        .post("/api/v1/messages")
        .send({
          sender: "Nisanthan",
          conversation_id: id,
          message: "Hi my name is Nisanthan"
        })
        .then(res => {
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe("Success");
          expect(res.body.description).toBe(
            "Message has been added to conversation thread."
          );
          expect(res.body.conversation_id).toBeTruthy();
        });
    });

    it("should reject w/o sender, conversation_id, or message properties", () => {
      let badRequests = [
        {
          sender: "Maria",
          conversation_id: id
        },
        {
          conversation_id: id,
          message: "Hello my name is Maria"
        },
        {
          sender: "Maria",
          message: "Hello my name is Maria"
        }
      ];
      return Promise.all(
        badRequests.map(body => {
          return request(app)
            .post("/api/v1/messages")
            .send(body)
            .then(res => {
              expect(res.statusCode).toBe(400);
              expect(res.body.message).toBe("Bad Request");
            });
        })
      );
    });
  });

  describe("GET /api/v1/conversations/:id - get conversation thread", () => {
    it("should get a conversation with requested id", () => {
      return request(app)
        .get(`/api/v1/conversations/${id}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(Array.isArray(res.body.messages)).toBe(true);
          expect(res.body.id).toBeTruthy();
          res.body.messages.map(message => {
            expect(message).toHaveProperty("sender");
            expect(message).toHaveProperty("message");
            expect(message).toHaveProperty("created");
          });
        });
    });

    it("should return 400 on a request for a nonexistant id", () => {
      return Promise.all([
        request(app)
          .get("/api/v1/conversations/-32")
          .then(res => {
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("Bad Request");
          }),
        request(app)
          .get("/api/v1/conversations/99999")
          .then(res => {
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("Bad Request");
          })
      ]);
    });
  });

  describe("GET PUT POST DELETE * ", () => {
    it("should return 404", () => {
      return Promise.all([
        request(app)
          .get("/getMessages")
          .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("Not Found");
            expect(res.body.description).toBe(
              "The requested resource doesn't exist."
            );
          }),
        request(app)
          .post("/api/v2/oranges")
          .send({
            message: "I like oranges",
            sender: "Maria",
            conversation_id: id
          })
          .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("Not Found");
            expect(res.body.description).toBe(
              "The requested resource doesn't exist."
            );
          }),
        request(app)
          .put("/api/conversation")
          .send({
            message: "Oranges are weird",
            sender: "Nisanthan",
            conversation_id: id
          })
          .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("Not Found");
            expect(res.body.description).toBe(
              "The requested resource doesn't exist."
            );
          }),
        request(app)
          .delete("/messages")
          .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("Not Found");
            expect(res.body.description).toBe(
              "The requested resource doesn't exist."
            );
          })
      ]);
    });
  });
});
