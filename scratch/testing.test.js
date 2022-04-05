const { expect, test } = require('@jest/globals');
const imp = require('./testing.js');

//for testing setup(snapshot)
let member = {
    data: function() {
        return {
            fullName: 'A',
            primaryAddress: 'B',
            secondaryAddress: 'C',
            city: 'D',
            state: 'E',
            zipcode: 8,
            id: 9
        }
    }
}
let docs = [member, 2];
let snap = {
    docs: docs
}

test("should setup html", () => {
    const val2 = imp.setup(snap);
    expect(val2).toBeTruthy;
})