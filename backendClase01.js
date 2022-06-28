class User {
    constructor(name, lastName, books, pets) {
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return ` My name is ${this.name} and my last name is ${this.lastName}`;
    }

    addBook (title, author) {
        this.books.push({ bookTitle: `${title}`, author: `${author}`});
    }

    getBooks() {
        return this.books.map(book => `${book.bookTitle}`);
    }

    addPets(pet) {
        this.pets.push(pet);
    }

    countPets() {
        return this.pets.length;
    }
}

const Ciel = new User('Ciel', 'Doe', [{bookTitle: 'Crónica de una muerte anunciada', author: 'Gabriel García Márquez'}, {bookTitle: 'The unbearable lightness of Being', author: 'Milan Kundera'}], ["Manchitas","Sephiroth"]);



console.log(Ciel.getFullName()) // expected output: My name is Cile and my last name is Doe

console.log(Ciel.countPets());  // expected output 2: Manchitas and Sephiroth

console.log(Ciel.getBooks()); // expected output array with 2 objects: obj 1 {bookTitle: 'Crónica de una muerte anunciada', author: 'Gabriel García Márquez'}, obj 2 {bookTitle: 'The unbearable lightness of Being', author: 'Milan Kundera'}


Ciel.addPets("Perrito lindo");
console.log(Ciel.countPets()); // expected output 3: Manchitas, Sephiroth and Perrito Lindo

Ciel.addBook("Lord of the Rings", "J.R.R. Tolkien");
console.log(Ciel.getBooks()); // expected output array with 3 objects: obj 1 {bookTitle: 'Crónica de una muerte anunciada', author: 'Gabriel García Márquez'}, obj 2 {bookTitle: 'The unbearable lightness of Being', author: 'Milan Kundera'}, obj 3 {bookTitle: 'Lord of the Rings', author: 'J.R.R. Tolkien'}