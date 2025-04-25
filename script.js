//async function getCookie() {
    //document.cookie = "username=${username}; expires=Tue, 01 Jan 2030 00:00:00 UTC; path=/; secure; SameSite=Strict";
//}
document.addEventListener('DOMContentLoaded', function() { // Ensure DOM is fully loaded
  document.getElementById('jokeButton').addEventListener('click', telljoke);
  document.getElementById('weatherButton').addEventListener('click', getweather);
  document.getElementById('factButton').addEventListener('click', getfact);
  document.getElementById('gsearchButton').addEventListener('click', searchGoogle)
  document.getElementById('gameButton').addEventListener('click', playgame)
  document.getElementById('convertLink').addEventListener('click', openConvertLink)
});
setInterval(() => {
  // Fetch new data, update UI, etc.
  var datenow = new Date();
  current_date = datenow.getDate();
  current_month = datenow.getMonth()+1;
  currennt_year = datenow.getFullYear();
  format_date = current_date+'/'+current_month+'/'+currennt_year;
  current_sec = datenow.getSeconds();
  current_min = datenow.getMinutes();
  current_hour = datenow.getHours();
  format_time = current_hour+":"+current_min+":"+current_sec;
  document.getElementById('cd').textContent = format_date;
  document.getElementById('ct').textContent = format_time;
}, 1000); // Execute every 1000 milliseconds (1 second)
async function telljoke() {
  let jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call a fish with no eyes? Fsh!",
    "Why did the bicycle fall over? Because it was two tired!",
    "What do you call a fake noodle? An impasta!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a lazy kangaroo? A pouch potato!",
    "Why did the coffee go to the police? It got mugged!",
    "What musical instrument is found in the bathroom? A tuba toothpaste!",
    "Why did the math book look sad? Because it had too many problems!",
    "What do you call a cheese that isn't yours? Nacho cheese!",
    "Why did the golfer wear two pairs of pants? In case he got a hole-in-one!",
    "What do you call a belt made of watches? A waist of time!",
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "What do you call a sad strawberry? A blueberry!",
    "Why are fish so smart? Because they live in schools!",
    "What do you call a bear with no ears? B!",
    "Why did the cookie go to the doctor? Because he felt crummy!",
    "What do you call a pig that does karate? A pork chop!",
    "Why don't skeletons fight each other? They don't have the guts!",
    "What do you call a sleeping bull? A bulldozer!",
    "Why did the picture go to jail? Because it was framed!",
    "What do you call a sheep covered in chocolate? A candy baa!",
    "Why did the man put his money in the freezer? He wanted cold hard cash!",
    "What do you call a dinosaur that is deaf? Hear-o-saur!",
    "Why did the melon jump into the lake? It wanted to be a watermelon!",
    "What do you call a penguin in the desert? Lost!",
    "Why did the student eat his homework? Because the teacher said it was a piece of cake!",
    "What do you call a group of rabbits taking photos? A flash mob!",
    "Why did the invisible man turn down the job offer? He couldn't see himself doing it!",
    "What do you call a dog magician? A labracadabrador!",
    "Why did the orange stop running? Because he ran out of juice!",
    "What do you call a sad coffee? Depresso!",
    "Why did the cloud wear underwear? Because it saw the sky's bottom!",
    "What do you call a fish wearing a bowtie? Sofishticated!",
    "Why did the banana go to the doctor? Because it wasn't peeling well!",
    "What do you call a snobby pepper? Jalapeño business!",
    "Why did the computer go to the dentist? It had a byte to eat!",
    "What do you get from a pampered cow? Spoiled milk!",
    "Why did the mushroom go to the party? Because he was a fungi!",
    "What do you call a line of rabbits walking backwards? A receding hare line!",
    "Why did the burglar take a bath? He wanted to make a clean getaway!",
    "What do you call a nervous ant? An antsy-pants!",
    "Why don't pirates shower before they walk the plank? Because they'll just wash up on shore later!",
    "What do you call a bear with no socks? Bare feet!",
    "Why did the man name his dogs Rolex and Timex? Because they're watch dogs!",
    "What do you call a belt with a watch on it? A waist of time!",
    "Why did the golfer wear two pairs of pants? In case he got a hole-in-one!",
    "What do you call a lazy kangaroo? A pouch potato!"
  ];
  function getRandomJoke() {
    let randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }
  
  // Example usage:
  let randomJoke = getRandomJoke();
  document.getElementById("response").textContent = "Sure, here's a joke: "+randomJoke;
}
async function getweather() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }  
}
function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const accuracy = position.coords.accuracy;
  const altitude = position.coords.altitude;
  const altitudeAccuracy = position.coords.altitudeAccuracy;
  const heading = position.coords.heading;
  const speed = position.coords.speed;
  const timestamp = position.timestamp;

  retrieveweather(latitude,longitude)
}

function errorCallback(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.error("An unknown error occurred.");
      break;
  }
}

const options = {
  enableHighAccuracy: true, // Use more accurate location if possible
  timeout: 5000, // Maximum time to wait for location (milliseconds)
  maximumAge: 0, // Accept cached location only if it's very recent
};
async function retrieveweather(la, lo) {
  var lat = la;
  var lon = lo;
  var units = 'metric';
  var APIkey = '5410b872fb1d69e49e929d3815cd67f6';
  var apirequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${APIkey}`;

  try {
      const response = await fetch(apirequest); // Use await to wait for the response
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); //Handle errors
      }
      const data = await response.json(); // Parse the JSON data from the response

      // Now 'data' contains the weather information. You can extract the parts you need.
      console.log(data); // Log the data to the console for debugging

      // Example: Display the temperature and description
      const temperature = data.main.temp;
      const high = data.main.temp_max;
      const low = data.main.temp_min;
      const description = data.weather[0].description;
      const cityName = data.name;

      document.getElementById("response").textContent = `It is currently ${temperature}°C with a high of ${high}°C and a low of ${low}°C in ${cityName}. We describe the weather here to be '${description}'. Weather data from openweathermap.org.`;

  } catch (error) {
      console.error("Error fetching weather data:", error);
      document.getElementById("response").textContent = "Error fetching weather data.";
  }
}
async function getfact() {
  const hundredFacts = [
    "Honey never spoils.",
    "Bananas are berries, but strawberries aren't.",
    "A group of flamingos is called a flamboyance.",
    "The Eiffel Tower can be 15 cm taller during the summer.",
    "Octopuses have three hearts.",
    "Cows have best friends.",
    "A day on Venus is longer than a year on Venus.",
    "There are more trees on Earth than stars in the Milky Way galaxy.",
    "The average person walks the equivalent of five times around the world in their lifetime.",
    "The human nose can detect over 1 trillion scents.",
    "Lightning strikes the Earth 100 times per second.",
    "The Great Wall of China is not visible from space with the naked eye.",
    "Sharks existed before trees.",
    "A blue whale's heart is so large, a human could swim through its arteries.",
    "The Sahara Desert was once a tropical rainforest.",
    "There are more possible iterations of a game of chess than there are atoms in the observable universe.",
    "A cockroach can live for several weeks without its head.",
    "The world's oldest known wooden wheel was found in Slovenia.",
    "The first computer mouse was made of wood.",
    "Scotland has 421 words for 'snow'.",
    "The dot over the letter 'i' is called a tittle.",
    "The average person spends six months of their life waiting at red lights.",
    "The fastest gust of wind ever recorded on Earth was 253 mph.",
    "A jiffy is an actual unit of time: 1/100th of a second.",
    "There are more microorganisms living on your hand than there are people on Earth.",
    "The inventor of the Pringle's can was buried in one.",
    "The strongest muscle in the human body, relative to its size, is the masseter (jaw muscle).",
    "The first oranges weren't orange.",
    "A group of owls is called a parliament.",
    "The average cloud weighs about a million pounds.",
    "Armadillos almost always give birth to quadruplets.",
    "Polar bears are nearly undetectable by infrared cameras.",
    "The total weight of all the ants on Earth is about the same as the total weight of all the humans.",
    "The state of Florida is bigger than England.",
    "A giraffe can clean its ears with its 21-inch tongue.",
    "The first photograph of a person was taken in 1838.",
    "The largest snowflake ever recorded was 15 inches wide.",
    "Humans share 50% of their DNA with bananas.",
    "A shrimp's heart is in its head.",
    "The word 'set' has more definitions than any other word in the English language.",
    "There are more public libraries in the US than McDonald's restaurants.",
    "The electric chair was invented by a dentist.",
    "The average person produces enough saliva in their lifetime to fill two swimming pools.",
    "The first vending machines dispensed holy water.",
    "A group of hedgehogs is called a prickle.",
    "The oldest known living land animal is a tortoise named Jonathan.",
    "The human brain generates more electrical impulses in a single day than all the telephones in the world combined.",
    "The sound of a Krakatoa eruption in 1883 was heard 3,000 miles away.",
    "The first recorded surgery to remove an appendix was done in 1731.",
    "The world's largest pyramid is not in Egypt, but in Mexico.",
    "The average person falls asleep in seven minutes.",
    "A crocodile cannot stick its tongue out.",
    "The lifespan of a taste bud is about 10 days.",
    "The only letter that doesn't appear in any U.S. state name is Q.",
    "The first commercial text message was sent in 1992.",
    "The average person will shed 40 pounds of skin in their lifetime.",
    "The oldest known recipe is for beer.",
    "The 'sixth sick sheik's sixth sheep's sick' is said to be the toughest tongue twister in the English language.",
    "The human body contains enough carbon to make 9,000 pencils.",
    "The first alarm clock could only ring at 4 a.m.",
    "A bolt of lightning is six times hotter than the sun.",
    "The Mona Lisa has no eyebrows.",
    "The average person has about 10,000 taste buds.",
    "The world's oldest chewing gum is 9,000 years old.",
    "There are more possible sudoku grids than there are atoms in the universe.",
    "The first bicycle had no pedals.",
    "The average person uses 57 sheets of toilet paper a day.",
    "The word 'algorithm' comes from the name of a Persian mathematician, Al-Khwarizmi.",
    "The average American eats about 35,000 cookies in their lifetime.",
    "The first photograph of Earth from space was taken in 1946.",
    "The world's largest hailstone weighed over two pounds.",
    "The average person spends two weeks of their life kissing.",
    "The first known ambulance was created during the Civil War.",
    "The word 'trivia' comes from the Latin word for 'crossroads'.",
    "The average person will spend six years of their life dreaming.",
    "The first recorded use of the word 'hello' was by Thomas Edison.",
    "The world's oldest known map is from 7000 BC.",
    "The average person will walk 115,000 miles in their lifetime.",
    "The first commercial passenger airline flight took off in 1914.",
    "The world's largest sandcastle was over 54 feet tall.",
    "The average person will spend one year of their life looking for lost items.",
    "The first recorded use of the word 'OK' was in 1839.",
    "The world's oldest known shoes are over 5,500 years old.",
    "The average person will spend two years of their life on the phone.",
    "The first recorded use of the word 'spam' was in 1937.",
    "The world's oldest known musical instrument is a flute made from a vulture's bone.",
    "The average person will spend five years of their life eating.",
    "The first recorded use of the word 'robot' was in 1920.",
    "The world's oldest known eyeglasses are over 700 years old.",
    "The average person will spend six months of their life shaving.",
    "The first recorded use of the word 'selfie' was in 2002.",
    "The world's oldest known tattoo is on a 5,300-year-old mummy.",
    "The average person will spend three days of their life ironing.",
    "The first recorded use of the word 'meme' was in 1976.",
    "The world's oldest known dice are over 5,000 years old.",
    "The average person will spend six months of their life brushing their teeth.",
    "The first recorded use of the word 'hashtag' was in 2007.",
    "The world's oldest known lipstick is over 3,500 years old."
  ];
  function getRandomFact() {
    let randomIndexFacts = Math.floor(Math.random() * hundredFacts.length);
    return hundredFacts[randomIndexFacts];
  }
  let randomFact = getRandomFact();
  document.getElementById("response").textContent = "Sure, here's a fact: "+randomFact;
}
async function searchGoogle() {
  var query = document.getElementById("gsearch").value;
  var query = query.replace(/ /g,"+");
  var url = 'https://www.google.com/search?q='+query+'&udm=14';
  window.open(url, '_blank');
}
async function playgame() {
  window.open('https://sites.google.com/view/ingstu/games','_blank')
}
async function openConvertLink() {
  window.open('https://convertio.co/png-cur','_blank')
}