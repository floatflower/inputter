class Action
{
    constructor(inputter) {
        this.inputter = inputter;
    }

    /**
     * @abstract
     */
    start() {}
}

module.exports = Action;