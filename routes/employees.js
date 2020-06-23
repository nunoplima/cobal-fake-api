const express = require("express");
const router = express.Router();
const { getEmployees, createEmployee, updateEmployee, getEmployee, deleteEmployee, sendResponse } = require("../controllers/employees-controller");

router.get("/", getEmployees, sendResponse);

router.post("/", createEmployee, sendResponse);

router.get("/:employeeId", getEmployee, sendResponse);

router.delete("/:employeeId", deleteEmployee);

router.put("/:employeeId", updateEmployee, sendResponse);


module.exports = router;
