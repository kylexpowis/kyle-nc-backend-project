const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const endPoints = require("../endpoints.json");
const sorted = require("jest-sorted");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/topics", () => {
    test("GET:200 sends an array of topics to the client", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
            const { topics } = body;
            expect(topics).toHaveLength(3)
            topics.forEach((topic) => {
                expect(topic).toMatchObject({
                    description: expect.any(String),
                    slug: expect.any(String)
                });
            });
        });
    });
});
describe("/api", () => {
    test("GET: 200 sends an object of all endpoints on api", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual({data: endPoints});
        });
    });
});
describe("/api/articles/:article_id", () => {
    test("GET: 200 sends an article object for the specified article ID", () => {
        const expectedArticleId = 1
        return request(app)
        .get("/api/articles/1")
        .then(({ body }) => {
            const { article } = body;
            expect(article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expectedArticleId,
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            })
        })
    })
    test("GET: 404 sends an error if the article ID is not found", () => {
        return request(app)
        .get("/api/articles/300")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("Article Not Found");
        })
    })
    test("GET: 400 responds with an error message of 'Bad Request' if the user enters an invalid field", () => {
        return request(app)
          .get("/api/articles/banana")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
          });
    });
});
describe("/api/articles/:article_id/comments", () => {
    test("GET: 200 responds with an array of comments for the given article_id", () => {
        return request(app)
        .get(`/api/articles/1/comments`)
        .expect(200)
        .then(({ body }) => {
            const { comments } = body;
            expect(comments).toBeInstanceOf(Array);
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: 1
                })
            })
        })
    })
    test("GET:200 responds with all comments sorted by comments with the most recent comment first", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;
            expect(comments).toHaveLength(11);
            expect(comments).toBeSortedBy("created_at", {descending: true });
          });
      });
    test("GET: 404 responds with an error message if the article ID doesnt exist", () => {
        return request(app)
        .get("/api/articles/200/comments")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("Article Not Found")
        })
    });
    test("GET: 400 responds with an error message if the article ID is invalid", () => {
        return request(app)
        .get("/api/articles/invalidarticletest")
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe("Bad Request")
        })
    });
})
describe("/api/articles", () => {
    test("GET: 200 sends an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeInstanceOf(Array);
          articles.forEach((article) => {
            expect(article).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String)
            })
        })
    })
})
});
describe("DELETE: /api/comments/:comment_id", () => {
    test('DELETE: 204 deletes the comment', () => {
        return request(app)
        .delete("/api/comments/1")
        .expect(204);
    });
    test('DELETE: 404 sends an error if the comment ID isnt found', () => {
        return request(app)
        .delete("/api/comments/700")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("Not Found")
        })
    })
})