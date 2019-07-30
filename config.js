module.exports = {
  DATABASE_URL: 'mongodb://mongo:27017/tasks',
  APP_PORT: 8082,
  START_DB_CLEAN: true,
  START_DB_SEED: true,
  SEED_DATA: [{
      name: "Call Mom",
      description: "Call her and say Happy Birthday",
      done: false,
      due: "2019-07-22"
      },
      {
      name: "Vacuum living room",
      description: "Because it needs it. Check vacuum bag fullness and order more bags if we need them.",
      done: false,
      due: "2019-07-22"
      },
      {
      name: "Wash car",
      description: "Ignore dents while washing. Check tires, too.",
      done: false,
      due: "2019-07-22"
      },
      {
      name: "Apply for grant",
      description: "Figure out how to apply for an NEA grant",
      done: true,
      due: "2019-07-22"
      },
      {
      name: "Coffee w Jason",
      description: "Schedule this, and read the book he recommended before we meet.",
      done: true,
      due: "2019-07-23"
      },
      {
      name: "Sign up for fall yoga retreat",
      description: "Register on the Yoga Shanti website",
      done: false,
      due: "2019-07-15"
      },
      {
      name: "Buy a book",
      description: "Research this year's best summer reads and order from an indie bookstore.",
      done: false,
      due: "2019-07-15"
      }
    ]
}