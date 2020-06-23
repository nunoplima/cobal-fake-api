const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const employeesRouter = require("./routes/employees");

const app = express();

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/employees", employeesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);

    if (app.get("env") === "development") {
        return res.json({ error: err, message: err.message });
    }
    return res.json({ error: "Sorry, there was a problem... :(" });
});

module.exports = app;
