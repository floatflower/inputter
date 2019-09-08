const readline = require('readline');
const colors = require('colors');
const Action = require('./action');

class InputAction extends Action
{
    constructor(validators, inputter)
    {
        super(inputter);
        this.validators = Array.isArray(validators) ? validators : [];
    }

    start() {

        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin
            });

            rl.on('line', (line) => {
                let valid = true;
                for(let i = 0; i < this.validators.length; i ++) {
                    if(typeof this.validators[i].validate === 'function') {
                        let isValid = this.validators[i].validate(line);
                        valid = isValid && valid;
                        if (!isValid) {
                            console.error(
                                typeof this.validators[i].message === 'string' ?
                                    this.validators[i].message.red : "Input Data Error.".red
                            );
                        }
                    }
                }

                if(valid) {
                    this.inputter.inputBuffer.push(line);
                    rl.close();
                    resolve();
                }

            })
        })

    }
}

module.exports = InputAction;