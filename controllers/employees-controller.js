const moment = require("moment");

let { employees } = require("../mocks/employees");
let id = 3;

const getEmployees = (req, res, next) => {
    req.employees = employees;
    next();
};

const getEmployee = (req, res, next) => {    
    const employee = employees.filter((employee) => employee.id == req.params.employeeId)[0];
    if (employee) {
        req.employee = employee;
        next();
    } else {
        res.sendStatus(404);
    }
};

const createEmployee = (req, res, next) => {
    const newEmployee = { ...req.body };
    newEmployee.id = ++id;
    newEmployee.photoUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg";
    newEmployee.created = newEmployee.created || moment(Date.now()).format("YYYY-MM-DD");
    newEmployee.updated = newEmployee.updated || moment(Date.now()).format("YYYY-MM-DD");
    employees.push(newEmployee);
    req.employee = newEmployee;
    next();
};

const updateEmployee = (req, res, next) => {
    const { employeeId } = req.params;
    const index = employees.findIndex((employee) => employee.id == employeeId);
    const updatedEmployee = { ...employees[index], ...req.body, updated: moment(Date.now()).format("YYYY-MM-DD") };
    employees[index] = updatedEmployee;
    req.employee = updatedEmployee;
    next();
};

const sendResponse = (req, res, next) => {
    if (req.employee)
        return res.status(req.method === "post" ? 201 : 200).json({ employee: req.employee });
    res.status(200).json({ employees: req.employees });
};

const deleteEmployee = (req, res, next) => {
    const employeesCopy = employees.filter((employee) => employee.id != req.params.employeeId);
    if (employeesCopy.length === employees.length) {
        return res.status(404).json({ error: "This employee has already been deleted" });
    }
    employees = employeesCopy;
    res.sendStatus(200);
};

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    getEmployee,
    sendResponse,
    deleteEmployee,
};
