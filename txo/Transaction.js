class Transaction {
    #sumReducer(accumulator, txo) {
        return accumulator + txo.amount
    }
    constructor(inputUTXOs, outputUTXOs) {
        this.inputs = inputUTXOs
        this.outputs = outputUTXOs
    }

    execute() {
        if (this.inputs.some(x => x.spent)) {
            throw new Error("Spent transactions found")
        }

        const income = this.inputs.reduce(this.#sumReducer, 0);
        const outcome = this.outputs.reduce(this.#sumReducer, 0);
      
        if (income < outcome) {
            throw new Error("Insufficient funds")
        }
      
        this.inputs.forEach(element => {
            element.spent = true
        });
    }
}

module.exports = Transaction;