import * as firebase from 'firebase';

// const config = {
//   apiKey: "AIzaSyDadCjXIULSE5WxxSWBW5mfpl0vaaRfncM",
//   authDomain: "expensify-test-355b0.firebaseapp.com",
//   databaseURL: "https://expensify-test-355b0.firebaseio.com",
//   projectId: "expensify-test-355b0",
//   storageBucket: "expensify-test-355b0.appspot.com",
//   messagingSenderId: "997617735309"
//   };

  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();
  // set up provider so firebase can authenticate with google
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export { firebase, googleAuthProvider, database as  default };

// Add a new value using push and have firebase generate the id property
// database.ref('expenses').push({
//     dscription: 'Rent 1',
//     note: '',
//     amount: 109500,
//     createAt: 125158888
// });


// database.ref('expenses').push({
//     dscription: 'Rent 2',
//     note: '',
//     amount: 50500,
//     createAt: 125158888
// });

// database.ref('expenses').push({
//     dscription: 'Rent 4',
//     note: '',
//     amount: 9500,
//     createAt: 125158888
// });

 // Subscribe to changes. on any changes on the database, notify me via callback
//  const onValueChange = database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
//   }, (e) => {
//     console.log('Error with data fetching, e');
//   });


// Subscribe to changes. on any changes on the database, notify me via callback
//   const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
//   }, (e) => {
//     console.log('Error with data fetching, e');
//   });

  // When this change takes effect, the on subscriber above should print the modified data
//   setTimeout(() => {
//     database.ref('age').set(30);
//   }, 3500);

//   // When this change takes effect, the on subscriber above should print the modified data
//   setTimeout(() => {
//     database.ref('age').set(32);
//   }, 7000);

//  // unsubscribe all subscriptions
//  setTimeout(() => {
//     database.ref().off();
//   }, 9000);

//   // unsubscribe from a specific subscription
//  setTimeout(() => {
//     database.ref().off(onValueChange);
//   }, 9000);

//   // When this change takes effect, the on subscriber above should print the modified data
//   setTimeout(() => {
//     database.ref('age').set(40);
//   }, 10500);
  


  // Fetch entire database
  // you can change ref() to ref('location/city') to fetch data for a specific node
//   database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     }).catch((e) => {
//         console.log('Error fetching data', e);
//     });



// Fetch our expenses 
//   database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         });
//         console.log(expenses);
    
//     }).catch((e) => {
//         console.log('Error fetching data', e);
//     });

// Subscriber for expenses below. Note that "on" does not support promises, therefore 
// you must pass callback as second argument to handle your success cases.
// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     });
//     console.log(expenses);
// });


// Subscriber for when an expenses child is removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// Subscriber for when an expenses child  is changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });


// Subscriber for when an expenses child  is added. When subscribtion is turned on,
// it will fire with children currently at that location, and reruns for new added expenses.
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });


//   database.ref().set({
//       name: 'Dan Borges',
//       age: 59,
//       stressLevel: 6,
//       job: {
//           title: 'Software devoloper',
//           company: 'Google'
//       },
//       location: {
//           city: "Holly Springs",
//           Country: "United States"
//       }
//   }).then(() => {
//       console.log('Initial object has been saved');
//   }).catch((err) => {
//     console.log('Database save for intitial object failed ', err);
//   })

//  database.ref('attributes').set({
//      height: "5.6",
//      weight: "180 lbs"
//  }).then(() => {
//     console.log('Attributes have been saved');
//  }).catch((err) => {
//     console.log('Database save for attributes failed ', err);
//  })

// remove node
// database.ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('data removed');
//     }).catch(() => {
//         console.log('remove failed');
//     })
   


// remove everything with remove
// database.ref()
//     .remove()
//     .then(() => {
//         console.log('data removed');
//     }).catch(() => {
//         console.log('remove failed');
//     });


// remove everything with set
    // database.ref().set(null).then(() => {
    //     console.log('Initial object has been saved');
    // }).catch((err) => {
    //   console.log('Database save for intitial object failed ', err);
    // })

// update database object
    // database.ref().update({
    //     name: 'Mike',
    //     age: 29,
    //     job: 'Manager',
    //     'location/city': 'Boston',
    //     isSingle: null
    // }).then(() => {
    //     console.log('Initial object has been saved');
    // }).catch((err) => {
    //   console.log('Database save for intitial object failed ', err);
    // })


    // update database object
    // database.ref().update({
    //     stressLevel: 9,
    //     'job/company': 'Amazon',
    //     'location/city': 'Seattle'
    // }).then(() => {
    //     console.log('Initial object has been saved');
    // }).catch((err) => {
    //   console.log('Database save for intitial object failed ', err);
    // })

