# Understanding Enums in TypeScript

When you want to write a code that has better readability, that means you want your code to be self explanatory  `enum` can be very helpful.  

Take a look at the following code, 

```ts
function handleDirection(direction : number) {
    if(direction === 1) moveUp();
    else if(direction === 2) moveDown();
    else if(direction === 3) moveLeft();
    else if(direction === 4) moveRight();
    else throw new Error("Invalid direction");
}
```

Here, we are using numbers to represent directions. This is not very readable. But if we use `enum` to represent the directions, it will be more intuitive. 

```ts
enum Direction {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4,
}

function handleDirection(direction : Direction) {
    if(direction === Direction.Up) moveUp();
    else if(direction === Direction.Down) moveDown();
    else if(direction === Direction.Left) moveLeft();
    else if(direction === Direction.Right) moveRight();
    else throw new Error("Invalid direction");
}
```

Now, it looks much better right?

What if we forget to initialize the enum values? 

```ts
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}
```

In this case, the values will be Up = 1, Down = 2, Left = 3, Right = 4. Why?  
Because, the numeric enums are auto incremented. That means when we declare the first enum value as 1. The next one will get the value 1 and increment it by 1. So, Down = 2, Left = 3, Right = 4.  

If we do not initialize any of the enum values, it will start from 0. 

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

Here, the above code sets the values as Up = 0, Down = 1, Left = 2, Right = 3. 

***Remember** only `numeric enums` are auto incremented. Shortly we will see `string enums` they are not auto incremented.* 


## How do we use enums?
Enums are very easy to use. You can use them just like any other type by using the enum name and the enum value.

```ts
console.log(Direction.Up); // 0 
```

You can also use the enum value to get the name of the enum. 

```ts
console.log(Direction[0]); // Up
```

This is called **reverse mapping**. It is only available for `numeric enums`.

## String Enums
String enums are a bit different. **They are not auto incremented**. You have to assign a value to each enum value.  
For example, 

```ts
enum Role {
    Admin = "Admin",
    User = "User",
    Guest = "Guest",
}
```
Here, we have to assign a value to each enum value. If we do not assign a value, it will throw an error. 

```ts
enum Role {
    Admin = "admin",
    User,           // Error: Enum member must have initializer
    Guest = "guest",
}
```

Another type of enum is `Heterogeneous Enums`. This is a mix of string and numeric enums. 

```ts
enum Role {
    Admin = "admin",
    User = 1,
    Guest = "guest",
}
```

But this is not recommended. Because the idea of enums is to make your code clear and readable. Mixing string and numeric enums can make your code confusing.

## Enums at runtime

Enums at runtime becomes a real object. So, you can use them like any other object. 

```ts
enum Role {
    Admin = "admin",
    User = "User",
    Guest = "guest",
}

functtion getRole(obj : { Admin : string }) {
    return obj.Admin;
}
```
This will work. Because Role is an object at runtime and it has a property called Admin.

**But!** there is a catch. If you use `const` with enums, it will not be an object at runtime. It will be a type.
```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
 
let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
```

this will convert the directions to an array of numbers. 

```ts
let directions = [0, 1, 2, 3];
```

So, to wrap it up,
- Enums are a way to define a set of named constants.
- Enums can be numeric or string enums.
- Numeric enums are auto incremented.
- String enums are not auto incremented.
- Enums at runtime become an object.
- If you use `const` with enums, it will not be an object at runtime. It will be a type.

Happy coding!

References:
- [TypeScript Enums](https://www.typescriptlang.org/docs/handbook/enums.html)


# Understanding Type Predicates in TypeScript

I was confused while reading the TypeScript documentation, **Why do we even need Type Predicates?** Our job seems to be simply checking conditions and calling methods based on the results. Pretty simple and straight forward right? But here is an example where type predicate plays a vital role by helping the TypeScript compiler to determine the type of the object.

## What is a Type Predicate?

A **type predicate** is a special return type in TypeScript that tells the compiler about the type of a variable in a specific condition. It's commonly used in user-defined type guard functions to narrow down types.

The syntax looks like this:

```ts
function isBird(animal: Animal): animal is Bird {
  return animal instanceof Bird;
}
```

Here, `animal is Bird` is the **type predicate**. It informs TypeScript that if this function returns `true`, the `animal` parameter can be treated as a `Bird` within that scope.

## Why Do We Need Type Predicates?

Let’s consider an example involving a class hierarchy. Suppose we have a base class `Animal` and two derived classes `Cat` and `Bird`:

```ts
class Animal {
    name: string;
    species: string;

    constructor(name: string, species: string) {
        this.name = name;
        this.species = species;
    }

    move() {
        console.log("Animal is moving");
    }
}

class Cat extends Animal {
    walk() {
        console.log("Cat is walking...");
    }
}

class Bird extends Animal {
    fly() {
        console.log("Bird is flying...");
    }
}
```

Now, we want to write a function that performs actions based on the specific subclass of `Animal`. Here's an attempt without using type predicates:

```ts
const isCat = (animal: Animal): boolean => {
    return animal instanceof Cat;
};

const isBird = (animal: Animal): boolean => {
    return animal instanceof Bird;
};

const handleAnimal = (animal: Animal) => {
    if (isCat(animal)) {
        animal.walk(); // Error: Property 'walk' does not exist on type 'Animal'.
    } else if (isBird(animal)) {
        animal.fly(); // Error: Property 'fly' does not exist on type 'Animal'.
    } else {
        animal.move();
    }
};
```

This error happens because, `instanceof` identifies the object type at runtime, TypeScript's static type system doesn't automatically narrow types when using `boolean` as return type inside the `if` block, TypeScript still sees `animal` as the base `Animal` type, so attempting to call subclass methods like `walk()` or `fly()` results in type errors.

## Solving It with Type Predicates

To help the compiler understand the specific type of `animal`, we need to use type predicates:

```ts
const isCat = (animal: Animal): animal is Cat => {
    return animal instanceof Cat;
};

const isBird = (animal: Animal): animal is Bird => {
    return animal instanceof Bird;
};
```

Now update the `handleAnimal` function:

```ts
const handleAnimal = (animal: Animal) => {
    if (isCat(animal)) {
        animal.walk(); // No error
    } else if (isBird(animal)) {
        animal.fly(); // No error
    } else {
        animal.move();
    }
};
```

With type predicates, TypeScript understands the type properly and allows you to safely access subclass-specific methods.


This is how type predicates helps to determine the ts compiler the correct type.  

By using type predicates, you ensure:

* Better type safety
* Cleaner and more readable code

Happy Learning!!



# Interface vs Type Aliases in Typescript

Maybe it is the most asked questions to a typescript programmer to differentiate between `interface` and `type aliases`. In this blog we will try to find out what is `interface` and what is a `type alias`.

## Type alias

Type alias is the process to create a new name for the existing types.  
For example,
```ts
type StringOrNumber = string | number;

type User = {
    name : string;
    age : number;
}
```

## TypeScript interface

Interface is the way to define the structure of a object. It is more like a contract between the declaration and the implementation.  

The syntax is almost similiar to type alias but there is a little change, you can to use ` = ` when declaring an interface.

```ts
interface User {
    name : string;
    age : number;
}
```

## Differences 

### primitive types and type union

The first difference between `interface` and `type alias` is, **you can not use interface for primitive types or union of types**

```ts
type StringOrNumber = string | number  // Ok

interface StringOrNumber = string | number // Error
```

### Declaration marging

Declaration marging is only allows for interface. Declaration marging means, you can define an interface multiple times, and the TypeScript compiler will automatically merge these definitions into a single interface definition.

```ts
interface User {
    name : string;
}

interface User {
    age : number;
}
```

It is totally ok for interface and the resultent `User` interface will be
```ts
interface User {
    name : string;
    age : number;
}
```

but you can not do this for `type alias`.

```ts
type User = {
    name : string;
}

type User = {
    age : number    // Error: Duplicate identifier User
}
```

### `extends` and `type intersecction`

You can `extend` an interface, which is a very common behaviour in TypeScript OOP. 

```ts
interface User {
    name : string;
    age : number;
}

interface VIPUser extends User {
    privileges : string[]
}
```

This `VIPUser` inherits `name` and `age` property of the `User` and also adds new property `privileges`. In `type alias` you can not use `extends` keyword instead you use `type intersection`

```ts
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type WorkingPerson = Person & Employee;

const john: WorkingPerson = {
  name: "John Doe",
  age: 30,
  employeeId: 1234,
  department: "Engineering",
};
```

This blog is more of begeiner friendly, there are many cases to explore, many things to know in the world of TypeScript. This little page can be a place of starting a bigger journey.

Happy Coding!  



<br>


**Md. Sabbir Hosen**  
*Software Engineering*  
**University of Dhaka**  



