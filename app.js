const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");
const { type } = require("os");

let finalHtml = []


const questions = [
    {
        type: "input",
        message: "What is your Manager's name? ",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is your Manager's ID number? ",
        name: "managerID"
    },
    {
        type: "input",
        message: "What is your Manager's email address? ",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "What is your Manager's office number? ",
        name: "managerOfficeNumber"
    }
];

const questionsEng = [
    {
        type: "input",
        message: "What is your Engineer's name? ",
        name: "engineerName"
    },
    {
        type: "input",
        message: "What is your Engineer's ID number? ",
        name: "engineerID"
    },
    {
        type: "input",
        message: "What is your Engineer's email address? ",
        name: "engineerEmail"
    },
    {
        type: "input",
        message: "What is your Engineer's Github username? ",
        name: "engineerGithub"
    }
]

function engineerQuestions() {
    inquirer.prompt(questionsEng).then((response) => {
        // console.log(response)
        let name = response.engineerName;
        let id = response.engineerID;
        let email = response.engineerEmail;
        let github = response.engineerGithub;
        let engineer = new Engineer(name, id, email, github);
        console.log(engineer);
    });
}

const questionsInt = [
    {
        type: "input",
        message: "What is your Intern's name? ",
        name: "internName"
    },
    {
        type: "input",
        message: "What is your Intern's ID number? ",
        name: "internID"
    },
    {
        type: "input",
        message: "What is your Intern's email address? ",
        name: "internEmail"
    },
    {
        type: "input",
        message: "What is your Intern's school? ",
        name: "internSchool"
    }
]

function internQuestions() {
    inquirer.prompt(questionsInt).then((response) => {
        // console.log(response)
        let name = response.internName;
        let id = response.internID;
        let email = response.internEmail;
        let school = response.internSchool;
        let intern = new Intern(name, id, email, school);
        console.log(intern);
    });
}    


const finalQuestion = [
    {
        type: "list",
        message: "Which type of team member would you like to add? ",
        choices: ["Engineer", "Intern", "I don't want to add any more."],
        name: "memberType"
    }
]

function last(){
    inquirer.prompt(finalQuestion).then((response) => {
        console.log(response)
        if (response.memberType === "Engineer"){
            engineerQuestions();
            last();
        }else if (response.memberType === "Intern"){
            internQuestions();
            last();
        } else {
            console.log(finalHtml)
        }
    })
}

inquirer.prompt(questions).then((response) => {
    // console.log(response);
    let name = response.managerName;
    let id = response.managerID;
    let email = response.managerEmail;
    let officeNumber = response.managerOfficeNumber;
    let manager = new Manager(name, id, email, officeNumber)
    console.log(manager);
    last();
});

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!