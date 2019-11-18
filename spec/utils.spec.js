const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("take an array and returns an array", () => {
    expect(formatDates([])).to.be.eql([]);
  });
  it("take an array of a single object and returns an array with the timestamp key updated on the object", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      }
    ];
    expect(formatDates(input)).to.be.eql(expected);
  });
  it("takes an array of multiple objects and returns an array with the timestamps key updated on the objects", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: 1500659650346
      }
    ];
    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: new Date(1500584273256)
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: new Date(1500659650346)
      }
    ];
    expect(formatDates(input)).to.be.eql(expected);
    expect(formatDates(input)).to.not.equal(expected);
  });
});

describe("makeRefObj", () => {
  it("when passed an empty array it will return an empty object", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("will take an array with a single article object and use their title key property as key, and get their article id as a value", () => {
    const input = [{ article_id: 1, title: "A" }];
    const expected = { A: 1 };
    expect(makeRefObj(input, "title", "article_id")).to.eql(expected);
  });
  it("will take an array with a single article object and use their title key property as key, and get their article id as a value", () => {
    const input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" }
    ];
    const expected = {
      A: 1,
      B: 2,
      C: 3
    };
    expect(makeRefObj(input, "title", "article_id")).to.eql(expected);
  });
});

describe.only("formatComments", () => {
  it("takes an empty array and returns an empty array", () => {
    expect(formatComments([])).to.eql([]);
  });

  it("takes an array containing a single object and updates keuy names", () => {
    input = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to: "A",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    expected = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: 1,
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    refObj = { A: 1, B: 2, C: 3 };
    expect(formatComments(input, refObj)).to.eql(expected);
  });
  it("takes an array containing multiple objects and updates keuy names", () => {
    input = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to: "A",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to: "B",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to: "C",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    expected = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: 1,
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      },
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: 2,
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      },
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: 3,
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    refObj = { A: 1, B: 2, C: 3 };
    expect(formatComments(input, refObj)).to.eql(expected);
  });
});
