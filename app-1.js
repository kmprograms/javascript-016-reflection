/*

-------------------------------------------------------------------------------------------------------
Refleksyjnosc czyli mozliwosc do manipulowania / zarzadzania zmiennymi, wlasciwosciami, obiektami
i innymi skladnikami w runtime.

JS od dawna ma w sobie liczbe metody, ktore umozliwiaja refleksyjne zarzadzanie kodem, np.
Object.keys(), Object.getOwnPropertyDescriptor(), Array.isArray(), ...
chociaz oficjalnie nikt o tym nie mowi i nie nazywa tego refleksyjnoscia.

Od JS ES6 pojawil sie nowy obiekt ktory nazywa sie Reflect, ktory jeszcze bardziej
zwieksza mozliwosci refleksyjne.

Reflect nie mozesz wykorzystywac z operatorem new czy wywolywac go jak zwykla funkcje.
Wszystkie metody tego obiektu sa statyczne.

Reflect pozwala uporzadkowac i wprowadzic kilka ulepszen do metod zarzadzania refleksyjnego.

------------------------------------------------------------------------------------------------------
Wykaz metod obiektu Reflect:

Reflect.apply()                     – wywolanie funkcji z podanymi argumentami

Reflect.construct()                 – imitowanie zachowanie operatora new

Reflect.defineProperty()            – podobny do Object.defineProperty() + zwraca boolean jezeli udalo sie zdefiniowac
                                      property

Reflect.deleteProperty()            – podobny do operatora delete, tyle ze to funkcja

Reflect.get()                       – zwraca wartosc pod podanym kluczem

Reflect.getOwnPropertyDescriptor()  – podobny do Object.getOwnPropertyDescriptor() - zwraca deskryptor wlasciwosci,
                                      a jezeli nie ma wlasciwosci to zwraca undefined

Reflect.getPrototypeOf()            – podobny do Object.getPrototypeOf().

Reflect.has()                       – podobny do operatora in operator, tyle ze to funkcja, sprawdza czy obiekt ma
                                      taka property jak podano

Reflect.isExtensible()              – podobny do Object.isExtensible().

Reflect.ownKeys()                   – zwraca tablice properties obiektu, ale tych ktore nie sa odziedzczone

Reflect.preventExtensions()         – podobny do Object.preventExtensions()

Reflect.set()                       – ustawia wartosc dla property i zwraca true jezeli to ustawienie sie powiodlo

Reflect.setPrototypeOf()            – ustawia prototype obiektu

*/

// ------------------------------------------------------------------------------------------------------
// Tworzenie nowego obiektu -> Reflect.construct

class Message {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }

    get fullMessage() {
        return `${this.title}: ${this.text}`;
    }

    hasTitleLongerThan(len) {
        if (len <= 0) {
            throw new Error('Length value must have positive value');
        }
        return this.title.length > len;
    }
}

let args = [ 'MESSAGE TITLE', 'MESSAGE TEXT' ];
let message = Reflect.construct(Message, args);
console.log(message instanceof Message);
console.log(message.fullMessage);

// ------------------------------------------------------------------------------------------------------
// Wywolywanie funkcji -> Reflect.apply
console.log(message.hasTitleLongerThan(5));
console.log(Reflect.apply(message.hasTitleLongerThan, message, [5]));

// ------------------------------------------------------------------------------------------------------
// Definiowanie wlasciwosci -> Reflect.defineProperty
// Zwraca dodatkowo boolean czy udalo sie zdefiniowac property czy nie
let isCategoryDefined = Reflect.defineProperty(message, 'category', {
    value: 'Sport',
    configurable: true,
    writable: true,
    enumerable: true
});
console.log(isCategoryDefined);
console.log(message);

console.log(Reflect.has(message, 'category'));

console.log(Reflect.ownKeys(message));

Reflect.deleteProperty(message, 'category');

console.log(Reflect.ownKeys(message));

console.log(Reflect.getOwnPropertyDescriptor(message, 'title'));

Reflect.set(message, 'title', 'XXX');

console.log(Reflect.getOwnPropertyDescriptor(message, 'title'));
