
function formatString(input: string, toUpper?: boolean): string {
    if (toUpper === true || toUpper === undefined) {
        return input.toUpperCase();
    } else {
        return input.toLocaleLowerCase();
    }
}


type Item = {
    title: string;
    rating: number;
}

function filterByRating(items: Item[]): Item[] {

    const filteredItems = items.filter((item: Item): boolean => {
        return item?.rating >= 4;
    })

    return filteredItems;
}


function concatenateArrays<T>(...arrays: T[][]): T[] {
    let concatenatedArray: T[] = [];
    for (let i = 0; i < arrays.length; i++) {
        concatenatedArray = concatenatedArray.concat(arrays[i]);
    }

    return concatenatedArray;
}


class Vehicle {
    private make: string;
    private year: number;

    constructor(make: string, year: number) {
        this.make = make;
        this.year = year;
    }

    get getMake(): string {
        return this.make;
    }

    set setMake(make: string) {
        this.make = make;
    }

    get getYear(): number {
        return this.year;
    }

    set setYear(year: number) {
        this.year = year;
    }

    public getInfo(): string {
        return `Make: ${this.make}, Year: ${this.year}`;
    }
}


class Car extends Vehicle {
    private model: string;

    constructor(make: string, year: number, model: string) {
        super(make, year);
        this.model = model;
    }


    set setModel(model: string) {
        this.model = model;
    }

    public getModel(): string {
        return `Model: ${this.model}`;
    }

    /* Maybe we could override the getInfo() method to pass the updated info
    but I am not overriding getInfo() method to match the output format you 
    have given in the problem descriptio.
    */

}

function isString(value: any): value is string {
    return typeof value === 'string';
}

function processValue(value: string | number): number {

    if (isString(value)) {
        return value.length;
    } else {
        return 2 * value;
    }

}



interface Product {
    name: string;
    price: number;
}

function getMostExpensiveProduct(products: Product[]): Product | null {
    if (products.length === 0) {
        return null;
    } else {
        products.sort((a: Product, b: Product): number => {
            if (a.price > b.price) {
                return -1;
            } else if (a.price < b.price) {
                return 1;
            } else {
                return 0;
            }
        })

        return products[0];
    }
}


enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

function getDayType(day: Day): string {
    if ( day === Day.Saturday || day === Day.Sunday) {
        return "Weekend"
    } else {
        return "Weekday"
    }
}



async function squareAsync(n: number): Promise<number> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (n >= 0) {
                resolve(n * n);
            } else {
                reject("Error: Negative number not allowed");
            }
        }, 1000);
    })
}

