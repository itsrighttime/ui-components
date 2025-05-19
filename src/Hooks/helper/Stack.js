class Stack {
    constructor() {
        this.items = [];
    }

    // Push an element onto the stack
    push(element) {
        this.items.push(element);
    }

    // Pop an element off the stack
    pop() {
        if (this.isEmpty()) return undefined;
        return this.items.pop();
    }

    // Peek at the top element of the stack without removing it
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.items.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the size of the stack
    size() {
        return this.items.length;
    }

    // Clear the stack
    clear() {
        this.items = [];
    }
}
