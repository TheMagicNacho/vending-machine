import { VendingMachine } from "../src/VendingMachine.mjs";
import { Item } from "../src/Item.mjs"

// const VendingMachine = require('../src/VendingMachine');
// const Item = require('../src/Item');


describe("the vending machine", function() {
    let vendingMachine;
    beforeEach( () => {
        itemArray = [
            new Item("ice cream", 5.5, '12341323333556'),
            new Item("gum", 1.5, '12312315562364326')
            ];
        vendingMachine = new VendingMachine();    
    });

    //see selections
    // displays all available snacks
    test("should display all available snacks", function() {
        expect(vendingMachine.seeSelections).toEqual([]);
    });

    //stock
    // adds input array of snacks to exisitng snacks
    test("Should add input array of snacks to existing snacks", function() {
        vendingMachine.stock(itemArray);
        expect(vedingMachine.seeSelection()).toBe(itemArray);
    });

    //deposit
    // updates existing customerFunds with the amount deposited
    test("Should update with how much was deposited", function() {
        vendingMachine.deposit(50);
        expect(vendingMachine.customerFunds).toBe(50);
        vendingMachine.deposit(50.50);
        expect(vendingMachine.customerFunds).toBe(100.50);
    });

    //giveChange
    // updates customerFunds to 0 and returns the remaining amount
    test("Should update customerFunds to 0 and give change ", function() {
        let change = vendingMachine.giveChange(50.50);
        expect(change).toEqual(50);
        expect(vendingMachine.customerFunds).toEqual(0);
    });

    //buy
    // updates inventory with bought snacks
    test("Should change inventory to updaote as things are bught", function() {
        vendingMachine.buy("gum");
        expect(vendingMachine.snacks).toHaveLength(1);
    });

    //buy
    // updates customerFunds to reflect purchase
    test("Should reduce customerFunds according to price of purchase", function() {
        vendingMachine.deposit(2);
        vendingMachine.buy("gum");
        expect(vendingMachine.customerFunds).toEqual(0.50);
    });

    //buy 
    //notifies customer if a snack is unavailable
    test("Should display that a snack is not available", function() {
        
        expect(vendingMachine.buy("Nachos")).toThrowError('snack is not available');
    });

    //buy
    // notifies customer when a snack costs more than available customerFunds
    test("Should inform if the snack costs more than amount deposited", function() {
        vendingMachine.deposit(1);
        expect(vendingMachine.buy("ice cream")).toThrowError('you poor');
    });

    //buy
    // clears out customerFunds by calling giveChange()
    test("Should clear customerFunds by calling giveChange", function() {
        vendingMachine.deposit(10);
        vendingMachine.buy("gum");
        let change = vendingMachine.giveChange();
        expect(change).toEqual(8.50);
        expect(vendingMachine.customerFunds).toEqual(0);
    });

});
