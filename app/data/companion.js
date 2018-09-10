var peopleArray = [
    {
      name: "Leonardo DiCaprio",
      photoURL:"http://specials-images.forbesimg.com/imageserve/558c0172e4b0425fd034f8ba/280x425.jpg?fit=scale&background=000000",
      answers:[1,1,2,2,3,3,4,4,5,5]
    },
    {
        name: "Celine Dion",
        photoURL:"https://s3.amazonaws.com/busites_www/celinedion/content/articles/16-0906.jpg",
        answers:[1,1,2,2,3,3,4,4,4,3]
      }
  ];
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = peopleArray;