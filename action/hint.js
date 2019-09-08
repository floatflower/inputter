const Action = require('./action');
const colors = require('colors');
class HintAction extends Action
{
    constructor(message, inputter)
    {
        super(inputter);
        this.message = message;
    }

    start() {

        return new Promise((resolve) => {
            console.log(this.message.green);
            resolve();
        })

    }
}

module.exports = HintAction;