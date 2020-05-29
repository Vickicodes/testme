# Test Me 
A JavaScript testing framework

# Features
- A Node based CLI framework
- Can test browser-based JavaScript apps
- Requires little set up
- Automatically finds all files in a given project that has a name of ".test.js"

# How it works
- File Collection
Finds all files ending in .test.js recursively in a directory, including nested folders. 
Stores a reference to each file.
After getting a full list of the test files, executes them one by one. 

- Test environment 
Works out whether it needs to test a node based project or a browser based project

- Executes all test files
Iterates over the test files and invokes each file in turn. 

- Reports the results in the command line 
In a clear and easy to read, colour coded format

# Installation

- Clone repository: 
- Install dependencies: npm i
- Run 'tme' in the terminal within the project folder that you want to test