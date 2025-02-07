const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const usersRouter = require("./routes/Users");
const coordinatorsRouter = require("./routes/Coordinators");
const eventRouter = require("./routes/Events");
const eventRegistrationRouter = require("./routes/EventRegistrations");
const problemStatementsRouter = require("./routes/ProblemStatements");
const solutionRouter = require("./routes/Solutions");
const studentRequest = require("./routes/StudentRequests");
const compileRouter = require("./routes/Compiler");
const testCasesRouter = require("./routes/TestCases");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

app.use("/users", usersRouter);
app.use("/coordinators", coordinatorsRouter);
app.use("/events", eventRouter);
app.use("/event-reg", eventRegistrationRouter);
app.use("/problem-stmt", problemStatementsRouter);
app.use("/solutions", solutionRouter);
app.use("/student-requests", studentRequest);
app.use("/compile", compileRouter);
app.use("/test-cases", testCasesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
