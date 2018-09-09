var peopleArray = [
    {
      name: "Buddy",
      photoURL:"https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=350",
      answers:[1,1,2,2,3,3,4,4,5,5]
    },
    {
        name: "Farley",
        photoURL:"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350",
        answers:[1,1,2,2,3,3,4,4,4,3]
      }
  ];
  
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = peopleArray;