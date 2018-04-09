// const person = {
//     name: 'Danny',
//     age: 59,
//     location: {
//         city: 'Holly Springs',
//         temp: 72
//     }
// }

// //  ================================================================================
// //  OBJECT DESTRUCTING
// //  ================================================================================

// // EXAMPLE #1

// // Renames property from name to firstname and also sets up default
// const {name: firstname = 'Anonymous', age} = person;
// console.log(`${firstname} is ${age}`);

// // Renames temp to temperature from temp to temperature
// const { city, temp: temperature } = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`)
// }

// // EXAMPLE #2

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {name: publisherName = 'Self-Published' } = book.publisher;
// console.log(`${publisherName}`);


// console.log('============================');
//  ================================================================================
//  ARRAY DESTRUCTING
//  ================================================================================

// EXAMPLE #1
const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
// const [street, city, state, zip] = address;
//   OR
const [, city, state] = address;
//   OR
// const [, city, state= ' New York'] = address;

console.log(`You are in ${city} ${state}`)

// EXAMPLE #1
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, ,mediumItemPrice] = item;

console.log(`A medium ${itemName} costs ${mediumItemPrice}`);


