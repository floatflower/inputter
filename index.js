const action = require('./action');

class Inputter
{
    constructor() {
        this.actions = [];
        this.inputBuffer = [];
    }

    input(validators) {
        let inputAction = new action.Input(validators, this);
        this.actions.push(inputAction);
        return this;
    }

    hint(message) {
        if(message.length > 0) {
            let hintAction = new action.Hint(message, this);
            this.actions.push(hintAction);
        }
        return this;
    }

    end() {
        if(this.actions.length > 0) {
            let p = this.actions[0].start();
            for (let i = 1; i <= this.actions.length - 1; i++) {
                p = p.then(() => this.actions[i].start());
            }
            return p.then(() => this.inputBuffer);
        } else {
            return p.then(() => []);
        }
    }
}

module.exports = Inputter;