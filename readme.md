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

