describe("Check some performance metrics", function () {
  it("check page load time", function () {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.performance.mark("start-loading");
      },
      onLoad: (win) => {
        win.performance.mark("end-loading");
      },
    })
      .its("performance")
      .then((p) => {
        p.measure("pageLoad", "start-loading", "end-loading");
        const measure = p.getEntriesByName("pageLoad")[0];

        assert.isAtMost(measure.duration, 1000);
      });
  });
});
