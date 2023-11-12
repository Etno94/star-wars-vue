Web Developer Challenge

### What's a closure? 

A closure is when you can have access to a blocked-scope variable outside of its scope, the function, by returning a function that handles such variable.

Example:

    function getData(word: string) {
        const wordYelled = word.toUpperCase();
        const wordReversed = word.split("").reverse().join("");

        return printYell = (wordYelled) => {
            return console.log(wordYelled);
        }
    }

    const yellHello = getData("hello");
    yellHello(); // prints "HELLO"

In this case, printYell creates the closure. Also, it has access to variables in the outer-scope, wordYelled. The variable wordYelled is being 'closed over' by the function printYell, which is returned, and making it so you can have access to from the outside of the getData scope. On the other hand, wordReversed remains as 'private', since it can't be accessed from outside.

### Where in the code is there a closure?

table.component.vue:
- setup(props)
- line 83: return { sortKey, reverse, sortedRows, sortRows };
    
In order to have access to these ref variables in the template, it's necesary to return them, making them being 'closed over';

### Sidenote

My primary focus during this challenge was to complete the main assignment: consuming data from the provided API and implementing sorting, all within the Vue framework, which I had 0 days experience in since a week ago. Despite this, I got to cover some project structure Im familiar with in a daily basis without losing sight of the primary objectives.
Because of that, I also managed to mix in the components the Card View in order to display the more visual side.

I appreciate the opportunity to demonstrate my capacity to learn and apply Vue within a tight timeframe. 
Thank you for considering my approach to this assignment.