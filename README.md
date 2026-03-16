# Repository hudl.web.tests
Repository on Hudl Login Page Tests, This read me gives an overview on how to run this project
## Prerequisites
- Install Node (https://nodejs.org/en/download)
- Install Visual Studio Code  (https://code.visualstudio.com/download)
## Running Project/Tests
- Clone this repository to your local machine.
- Open Visual Studio Terminal, and run the command to install dependent packages
  `npm i`
- To run project from your local machine create local.config.json file with credentials in below format.
    ```
    {
        "TESTUSER":"Your_UserName",
        "TESTPASSWORD":"Your_Password"
    }    
    ```
- Run below command to run tests from vs terminal.
    npx playwright test --ui
    --ui : to run in ui mode
- To run project in pipeline set environment variables TESTUSER,TESTPASSWORD
