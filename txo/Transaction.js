class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputs = inputUTXOs
        this.outputs = outputUTXOs
    }
    execute() {
        if (this.inputs.some(x => x.spent)) {
            throw new Error("Spent transactions found")
        }
    }
}

module.exports = Transaction;