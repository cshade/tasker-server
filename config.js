module.exports = {
  DATABASE_URL: "mongodb://localhost:27017/tasker",
  APP_PORT: 8082,
  START_DB_CLEAN: true,
  START_DB_SEED: true,
  SEED_DATA_TODAY_TASK: "Issue 7 cover art?",
  SEED_DATA_TOMORROW_TASK: "Send interview in next week's newsletter",
  SEED_DATA_TASK: [
    {
      name: "Issue 7 cover art?",
      description:
        "Where to begin? Get thoughts from editor-at-large and publisher",
      done: false,
      due: "2019-07-22"
    },
    {
      name: "Send designer back cover copy",
      description: "Choose which piece to excerpt on back cover.",
      done: true,
      due: "2019-07-22"
    },
    {
      name: "Make list of grants",
      description:
        "And then figure out next steps. How to apply for an NEA grant?",
      done: false,
      due: "2019-07-22"
    },
    {
      name: "Next issue guest poetry editor",
      description: "Confirm pay with publisher and board.",
      done: true,
      due: "2019-07-23"
    },
    {
      name: "Send interview in next week's newsletter",
      description: "Include links to buy latest print issue on our site.",
      done: false,
      due: "2019-07-15"
    },
    {
      name: "Review best-of summer reads",
      description:
        "Assign to fiction editor and order them the books (from indie bookstore).",
      done: false,
      due: "2019-07-15"
    },
    {
      name: "Add intern application to site",
      description:
        "Announce on social media also, and send link to local universities.",
      done: false,
      due: "2019-07-22"
    }
  ],
  SEED_DATA_REMINDER: [
    {
      remind: "Nominate for Pushcart Prize",
      remindwhen: "2019-12-10"
    },
    {
      remind: "Nominate for Best of Net",
      remindwhen: "2019-12-01"
    },
    {
      remind: "Nominate for Best of Net",
      remindwhen: "2018-12-01"
    }
  ]
};
