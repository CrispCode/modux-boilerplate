# MODUX-BOILER


## Installation
- Install modux-boilerplate via npm

```
npm install @crispcode/modux-boilerplate -g
```

## Usage
- Run the modux-boilerplate initialization command

```
modux-boilerplate { template_name } create
```

Fill the required information during the setup, and the project will create an environment in your current directory.
- Let's see if the environment works, shall we?
- npm start
- or
- npm run start

## Additional help
- You can always see the available commands for a template by using `modux-boilerplate { template_name }`
- If you want to see the available templates installed on your system, use `modux-boilerplate list`

## External templates
- You can use external templates by installing them with --global, and then using their name as template.
- For example:
```
    npm install @crispcode/modux-boilerplate -g
    npm install modux-template-test -g

    modux-boilerplate modux-template-test create
```

## OS Support
- UBUNTU - tested
- OSX - tested
- WINDOWS - tested
