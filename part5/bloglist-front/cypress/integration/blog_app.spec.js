const { func } = require("prop-types");

describe("Blog App", () => {
  beforeEach(function () {
    cy.request("post", "http://localhost:3001/api/reset");
    cy.visit("http://localhost:3000");

    const user = {
      username: "root",
      password: "secret",
      name: "Root Access",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
  });
  it("Login form is shown", function () {
    cy.contains("Log in");
    cy.get("#loginForm");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input#username").type("root");
      cy.get("input#password").type("secret");
      cy.contains("LOG IN").click();
      cy.contains("Logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input#username").type("roooot");
      cy.get("input#password").type("secreto");
      cy.contains("LOG IN").click();
      cy.contains("Failed");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "secret" });
    });

    it("A blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("Test title");
      cy.get("#author").type("Tester Jester");
      cy.get("#url").type("example.com");
      cy.contains("Create Blog").click();
      cy.contains("Test title");
      cy.contains("Tester Jester");
    });
  });

  describe("When logged in and browsing a list of blogs", function () {
    beforeEach(function () {
      cy.populateBlogs({ username: "root", password: "secret" });
      cy.login({ username: "root", password: "secret" });
    });

    it("should be able to like", function () {
      cy.contains("Details").click();
      cy.contains("likes 2");
      cy.contains("like").click();
      cy.contains("likes 3");
    });

    it("should be able to delete a blog", function () {
      cy.contains("Details").click();
      cy.contains("remove").as("removeBtn");
      cy.get("@removeBtn").click();
      cy.get("@removeBtn")
        .parent()
        .parent()
        .should("have.css", "display", "none");
    });

    it("should have its logs ordered by likes", function () {
      cy.contains("Details").click();
      cy.contains("Details").click();

      cy.get(".blog .details-like").then((res) => {
        expect(res[0]).to.contain("2")
        expect(res[1]).to.contain("0")
      })
    });
  });
});
