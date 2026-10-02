/*
  WHO LET YOU IN?

  SECTIONS:
  1. DATA POOLS
  2. RANDOM HELPERS
  3. PERSON GENERATION
  4. CASE GENERATION
  5. EVIDENCE GENERATION
  6. PHONE PERSONALITIES
  7. GAME STATE
  8. SCREEN MANAGEMENT
  9. AVATAR GENERATION
  10. APPLICANT SCREEN
  11. INVESTIGATION SCREEN
  12. PHONE CALLS
  13. DECISION & RESULT
  14. GAME OVER
  15. EVENT WIRING
  16. INIT

*/


/* ======================
   1. DATA POOLS
   ====================== */

  
/*
  This object connects each first name to a gender value.
  Used later when the game needs to create
  pronouns such as "he/him" or "she/her" for when other characters
  in the digital footprint or phone calls refer to the applicant. 
  This is as to make it more realistic.
*/
const NAME_GENDER = {
  Marcus: "m", Elena: "f", Tyler: "m", Priya: "f", Grace: "f", Kevin: "m",
  Whitney: "f", Ben: "m", Naomi: "f", Sara: "f", Jordan: "m", Devon: "m",
  Owen: "m", Maya: "f", Caleb: "m", Nora: "f", Felix: "m", Ivy: "f",
  Sam: "m", Ruth: "f", Leo: "m", Dana: "f", Miles: "m", Piper: "f",
  Theo: "m", Ruby: "f", Nate: "m", Vera: "f", Oscar: "m", Wren: "f",
  Diego: "m", Hana: "f", Adrian: "m", Leah: "f", Colin: "m", Tessa: "f",
  Julian: "m", Claire: "f", Eli: "m", Mina: "f", Isaac: "m", Chloe: "f",
  Aaron: "m", Elise: "f", Grant: "m", Lila: "f", Mateo: "m", Paige: "f",
  Roman: "m", June: "f", Elliot: "m", Sienna: "f", Dylan: "m", Celia: "f",
  Brooke: "f", Lucas: "m", Nina: "f", Victor: "m", Amara: "f", Jonah: "m",
  Connor: "m", Freya: "f"
};

// Object.keys() gives us an array containing just the names.
// FIRST_NAMES will be used later with pick()

const FIRST_NAMES = Object.keys(NAME_GENDER);


// Some characters can have nicknames.
// Not every person will receive a nickname though because
// the generator randomly decides whether to use one.

const NICKNAMES = {
  Marcus: "Marc", Tyler: "Ty", Kevin: "Kev", Ben: "Benny", Jordan: "Jo",
  Devon: "Dev", Caleb: "Cal", Sam: "Sammy", Miles: "Milo", Nate: "Nathan",
  Oscar: "Oz", Elena: "El", Priya: "Pri", Grace: "Gracie", Whitney: "Whit",
  Naomi: "Nomi", Sara: "Sar", Maya: "May", Nora: "Nori", Ivy: "Ives",
  Ruth: "Ruthie", Dana: "Dee", Piper: "Pipes", Ruby: "Rubes", Vera: "Vee",
  Wren: "Wrenny", Hana: "Han", Adrian: "Ade", Leah: "Lee", Colin: "Col",
  Tessa: "Tess", Julian: "Jules", Claire: "Clair", Eli: "E", Mina: "Min",
  Isaac: "Ike", Chloe: "Chlo", Aaron: "Ron", Elise: "Ellie", Grant: "G",
  Lila: "Lil", Mateo: "Teo", Paige: "P", Roman: "Rome", June: "Junie",
  Elliot: "Eli", Sienna: "Si", Dylan: "Dyl", Celia: "Cece", Brooke: "Brook",
  Lucas: "Luke", Nina: "Nin", Victor: "Vic", Amara: "Mari", Jonah: "Jo",
  Connor: "Con", Freya: "Frey"
};


// These are possible last names that can be combined with the
// first names to create random people.

const LAST_NAMES = [
  "Webb", "Kapoor", "Brooks", "Vasquez", "Nolan", "Ortiz", "Hall", "Sutton",
  "Chen", "Ling", "Reyes", "Ashford", "Park", "Diaz", "Fenwick", "Cole",
  "Marsh", "Reid", "Doyle", "Hayes", "Lowry", "Pratt", "Quinn", "Ramos",
  "Stone", "Tran", "Vance", "York", "Zamora", "Ibarra", "Bennett", "Morris",
  "Navarro", "Foster", "Kim", "Delgado", "Mercer", "Patel", "Rowe", "Holland",
  "Santos", "Fischer", "Bishop", "Cortez", "Wallace", "Khan", "Meyer", "Parker",
  "Sullivan", "Reed", "Moreno", "Chambers", "Lin", "Caldwell", "Romero", "Price",
  "Whitaker", "Singh", "Carver", "Mendoza", "Ellis", "Griffin", "Wong", "Barrett",
  "Castillo", "Hughes", "Vega", "Baxter", "Malik", "Donovan", "Cross", "Rossi",
  "Hawkins", "Nguyen", "Sawyer", "Graham", "Flores", "Hart", "Lawson", "Rivera",
  "Keller", "Montoya", "Baker", "Larsen", "Steele", "Cohen", "Davenport", "Mills",
  "Olsen", "Manning", "Wu", "Henderson", "Klein", "Serrano", "Phelps", "Vaughn"
];


// Some cool and fictional school names. 

const SCHOOLS = [
  "Veylan High School", "Kessara High School", "Morrowen High School",
  "Valenridge High School", "Ravenna High School", "Corvane High School",
  "Elaris High School", "Westervale High School", "Varell High School",
  "Orlen High School", "Merrow High School", "Velorin High School"
];


// Possible occupations for the applicants.
//  generateOfficialPerson() chooses one randomly for each applicant.

const OCCUPATIONS = [
  "Paramedic", "Funeral Home Assistant", "Court Clerk", "High School Counselor",
  "Dental Hygienist", "Pharmacy Technician", "Veterinary Assistant", "Auto Body Technician",
  "Electrician", "HVAC Technician", "Building Inspector", "Property Manager",
  "Insurance Adjuster", "Bank Teller", "Tax Preparer", "Legal Assistant",
  "Local Reporter", "Radio Host", "Archivist", "Museum Attendant",
  "Library Assistant", "Mail Carrier", "Night Shift Security", "Hotel Receptionist",
  "Tattoo Artist", "Mechanic", "Florist", "Funeral Director", "Freelance Illustrator",
  "Audio Technician", "Private Tutor", "Home Health Aide", "Animal Control Officer",
  "Bus Driver", "Corrections Officer", "Court Reporter", "Land Surveyor",
  "Utility Technician", "Construction Foreman", "Restaurant Owner"
];


/*
  These are fictional places outside the game's main region.
  Can be thought of as out-of-state.
  They are mainly used for legitimate applicants who recently moved
  into the area.
*/
const OUT_OF_REGION = [
  "Asterra", "Bellara", "Cavira", "Demeris", "Estara", "Korven",
  "Luthen", "Marovia", "Nivara", "Orselle", "Rovessa", "Sorevia"
];


// Relationships are used to generate contacts (for the references/phone 
//  calls part) and to create contradictions in fake applications.

const RELATIONS = [
  "friend", "roommate", "coworker", "classmate",
  "neighbor", "sibling", "cousin"
];


/*
  These are normal explanations an applicant might give for
  wanting to join the community.
  These will be used and reused in generateCase().
*/
const REASON_GENERIC = [
  "Just moved to the area and want to get to know people nearby.",
  "A friend recommended this place, figured I'd check it out.",
  "Looking for a local group to actually be part of.",
  "New in town, hoping to make some connections.",
  "Heard good things about this community from a coworker.",
  "wanted somewhere local to get involved now that ive settled in",
  "my roomate said i should join",
  "Trying to meet more people outside of work this year.",
  "Moved here a few months ago and still don't really know anyone.",
  "Figured I'd give the local community a shot.",
  "Been looking for somewhere to meet people who actually live nearby.",
  "The advertisements got me.",
  "I recently started working in town and thought I'd join.",
  "Just looking for something local to get involved with.",
  "A couple people at work mentioned the community.",
  "I've lived nearby for a little while but haven't really gotten involved.",
  "Trying to get out of the house more and meet people.",
  "My partner joined recently and suggested I sign up too.",
  "Wanted to find out what's actually going on around town.",
  "New job, new place, figured I might as well meet some people.",
  "I kept hearing about this from people around town.",
  "Looking for local events and people to hang out with :3",
  "Just settled in and thought this would be a good place to start.",
  "I don't know many people here yet, so I'm giving this a try.",
  "Saw someone mention the community online and figured I'd join.",
  "Been meaning to sign up for a while, finally got around to it.",
  "Hoping to find some people with similar interests nearby.",
  "Moved back to the area recently and wanted to reconnect with people.",
  "Mostly just curious about what's happening around here."
];


// Random fluff/filler so the digital footprint part is more realistic.

const FILLER_POSTS = [
  "finally tried that new coffee place downtown, kind of overrated ngl",
  "anyone know when the game starts tonight",
  "rain again. cool cool cool",
  "reorganized my whole closet and now I can't find anything",
  "why is parking downtown always impossible",
  "started a new show last night and already regret it",
  "wifi's been garbage all week",
  "does anyone actually like Mondays",
  "Found $5 in an old jacket pocket, today's already a good day",
  "The line at the pharmacy was insane today",
  "trying to fix my sleep schedule again, we'll see how long it lasts",
  "somebody left their cart in the middle of the parking lot again",
  "my plant is somehow still alive, low key proud of myself",
  "why does my phone update every single week",
  "forgot my umbrella again. shocking",
  "can we talk about how expensive groceries are right now",
  "spent an hour looking for my keys. they were in my hand",
  "who decided 8am meetings were a good idea",
  "made dinner instead of ordering out tonight, feeling accomplished",
  "the weather cannot make up its mind",
  "anyone else hearing construction at like 7 in the morning",
  "I need a weekend after this weekend",
  "just realized I haven't taken a day off in forever",
  "new headphones arrived and I immediately dropped them",
  "is there anywhere around here that stays open late",
  "accidentally bought way too many groceries again",
  "My neighbor's dog knows me better than most people do",
  "finally cleaned out my car. found things I forgot existed",
  "been listening to the same album for three days straight",
  "why are printers still this difficult",
  "had the weirdest interaction at the post office today",
  "does anyone know if the library is open tomorrow",
  "I swear every light turns red when I'm already late",
  "made coffee at home today and honestly it wasn't bad",
  "someone please tell me why laundry multiplies overnight",
  "went for a walk and immediately remembered why I don't exercise",
  "my grocery receipt was longer than my arm",
  "Forgot what I walked into the kitchen for",
  "Finally finished that book I've been putting off!",
  "the dog stole one sock and somehow that became a whole situation",
  "I need recommendations for somewhere decent to eat around here",
  "Another day of pretending I understand spreadsheets",
  "just saw the biggest moth I've ever seen in my life",
  "my car made a noise today that I am choosing to ignore",
  "cleaned my entire apartment instead of doing the thing I was supposed to do",
  "does anyone else have a drawer full of random chargers",
  "it's way too quiet outside tonight",
  "I really need to stop buying plants",
  "Spent half the morning trying to remember a password",
  "why is it suddenly freezing again",
  "finally got around to fixing that shelf",
  "my neighbor brought over cookies. unexpected but appreciated",
  "been putting off this dentist appointment for approximately forever",
  "anyone know a good place to get a haircut around here",
  "I forgot today was trash day. again",
  "The sunset was actually insane tonight",
  "trying to learn how to cook something other than pasta",
  "I have officially run out of clean mugs",
  "long week. that's the post",
  "just got home and realized I left the lights on all day",
  "does anyone else check the weather and then ignore it completely",
  "found an old photo from high school and immediately regretted opening it",
  "I miss having a normal sleep schedule",
  "the grocery store was packed for absolutely no reason",
  "finally replaced that broken lightbulb that's been bothering me for months"
];


/*
  These posts are intended to be obvious scams.
  They help create realistic "noise" in the feed and can sometimes
  become relevant evidence when the applicant's account interacts
  with one of them.
*/
const SPAM_POSTS = [
  "URGENT: Your account has been selected for a $500 reward. Claim now!",
  "Your account has been reported. Verify your identity here to avoid suspension.",
  "Congratulations!! You've been chosen for a FREE gift card. Click the link to claim.",
  "We noticed unusual activity on your account. Confirm your password here.",
  "You've won our monthly giveaway! Send your full name and address to claim.",
  "ATTENTION MEMBERS: Your account will be deleted unless you verify today.",
  "Free concert tickets!! Just send your email + phone number to enter.",
  "Your package could not be delivered. Pay the $2.99 redelivery fee here.",
  "Someone tried to log into your account. Click here to secure it immediately.",
  "WINNER ALERT 🎉 You've been randomly selected for a $1,000 cash prize!",
  "Limited-time investment opportunity. Guaranteed returns. DM me for access.",
  "Your subscription payment failed. Update your billing information to avoid cancellation.",
  "FREE MONEY for local residents!! Fill out this form before midnight.",
  "You've been pre-approved for a $15,000 loan. No credit check required.",
  "Exclusive job opportunity: $500/day, work from home, no interview required.",
  "We are removing inactive accounts this week. Verify your account now.",
  "Congratulations, you've been selected to receive a new phone. Shipping fee required.",
  "Earn unlimited income with this one simple trick. Link in comments.",
  "Your payment was declined. Confirm your card information to prevent account closure.",
  "You've won! Reply with your full name, address, and phone number to claim."
];


// If the applicant interacts with spam, these can be used as
// believable replies from that account.

const SCAM_REPLIES = [
  "go away scammer",
  "You are weird",
  "nice try lol",
  "Yeahhh absolutely not",
  "bro this is obviously a scam",
  "You wish",
  "PLEASE STOP",
  "who falls for this stuff",
  "reported",
  "lol no thanks",
  "this account is so weird",
  "Wait really???"
];


/*
  These posts are used when another account has a username
  similar to the applicant's username.
  This is useful for the "similar identity" situation because
  the player has to understand that similar usernames do not
  automatically mean the two accounts belong to the same person.
*/
const SIMILAR_USERNAME_POSTS = [
  "This person is impersonating me and keeps deleting my replies.",
  "Apparently someone made an account almost identical to mine.",
  "If you see another account pretending to be me, that's not mine.",
  "Getting really tired of people confusing this account with another one."
];


// Constant values used throughout the game. 

const RECORDS_AGENCY = "MERIDIAN COUNTY RECORDS OFFICE";

const GAME_YEAR = 2026;
const GAME_MONTH = 9;
const GAME_DAY = 9;


// Used by formatDate() so we can turn numeric months into
// readable names

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


/*
  These are the possible types of problems that can be placed
  into a fake application.

  The names here will be used by generateCase() to decide 
  which contradiction to create.
*/
const FAKE_CASE_TYPES = [
  "birthday_mismatch",
  "school_mismatch",
  "timeline_mismatch",
  "username_suspicious",
  "account_age_mismatch",
  "connection_contradiction"
];




/* ======================
     2. RANDOM HELPERS
   ====================== */


// Random whole number between min and max, including both.

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Pick a random item from an array.

function pick(arr) {
  return arr[randomInt(0, arr.length - 1)];
}


/*
  Pick something that isn't the excluded value.
  Useful for things like fake schools or other mismatches.
*/

function pickDifferent(arr, excludeValue) {
  let value;

  do {
    value = pick(arr);
  } while (value === excludeValue);

  return value;
}


// Pick a few different items from an array.

function pickSome(arr, count) {
  return shuffleArray(arr).slice(0, count);
}


// Shuffle an array.

function shuffleArray(arr) {
  const copy = arr.slice();

  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}


/*
  Capitalizes the first letter.
  Used for pronouns at the start of sentences:
  "she" -> "She" (Hey if it works, it works)
*/
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// Makes a date object without having to write it out every time.

function makeDate(year, month, day) {
  return { year, month, day };
}


/* Formats a date like: "September 9, 2026" */

function formatDate(dateObj) {
  return `${MONTH_NAMES[dateObj.month - 1]} ${dateObj.day}, ${dateObj.year}`;
}


/*
  Returns a date from a certain number of days ago.
  Used for things like account creation and posts.
*/
function daysAgo(numDays) {
  const today = new Date(GAME_YEAR, GAME_MONTH - 1, GAME_DAY);

  today.setDate(today.getDate() - numDays);

  return makeDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
}


// Makes a fake phone number.

function generatePhone() {
  return `(555) 0${randomInt(10, 99)}-${randomInt(1000, 9999)}`;
}


/*
  Removes everything except the numbers.
  Useful when comparing differently formatted phone numbers.
*/
function normalizeDigits(str) {
  return str.replace(/\D/g, "");
}


/*
  Figure out whether to use "a" or "an".
  (The game was very funny before this lol)
*/
function relationArticle(word) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}


// Get the pronouns for the given gender.

function pronounFor(gender) {
  return gender === "f"
    ? { subj: "she", obj: "her", poss: "her" }
    : { subj: "he", obj: "him", poss: "his" };
}



/* =====================
   3. PERSON GENERATION
   ===================== */

// Gets applicant's birth year

function generateBirthDate(age) {
  let birthYear = GAME_YEAR - age;
  const birthMonth = randomInt(1, 12);
  const birthDay = randomInt(1, 28);

  // Birthday hasn't happened yet, so use the previous year.
  if (
    birthMonth > GAME_MONTH ||
    (birthMonth === GAME_MONTH && birthDay > GAME_DAY)
  ) {
    birthYear--;
  }

  return {
    birthYear,
    birthMonth,
    birthDay
  };
}


// Generate a normal person.

function generateOfficialPerson() {

  // Pick their name and gender.
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const gender = NAME_GENDER[first];

  // Generate their age and birthday.
  const age = randomInt(18, 33);
  const birth = generateBirthDate(age);

  // Pick their school and graduation year.
  const school = pick(SCHOOLS);
  const graduationYear = birth.birthYear + 18;

  // Pick their job.
  const occupation = pick(OCCUPATIONS);

  // Make their username.
  const username = buildUsername(first, last);

  // Pick how old their account is.
  const accountAgeDays = randomInt(60, 1800);
  const createdDate = daysAgo(accountAgeDays);

  // Older accounts might have old usernames.
  const usernameHistory = buildUsernameHistory(
    first,
    last,
    createdDate,
    accountAgeDays,
    username
  );

  // Some people have a nickname.
  const nickname = Math.random() < 0.45
    ? (NICKNAMES[first] || null)
    : null;

  // Return all of their info.
  return {
    first,
    last,
    name: `${first} ${last}`,
    gender,
    pronoun: pronounFor(gender),
    nickname,
    age,
    birthYear: birth.birthYear,
    birthMonth: birth.birthMonth,
    birthDay: birth.birthDay,
    birthday: formatDate(
      makeDate(birth.birthYear, birth.birthMonth, birth.birthDay)
    ),
    school,
    graduationYear,
    occupation,
    username,
    createdDate,
    accountAgeDays,
    usernameHistory,
    connections: generateConnections()
  };
}


// Creates a normal looking username.

function buildUsername(first, last) {
  const options = [
    `${first.toLowerCase()}.${last.charAt(0).toLowerCase()}${randomInt(1, 99)}`,
    `${first.toLowerCase()}${last.toLowerCase()}`,
    `${first.charAt(0).toLowerCase()}${last.toLowerCase()}${randomInt(10, 99)}`,
    `${first.toLowerCase()}_${randomInt(100, 999)}`
  ];

  return pick(options);
}


// Makes sure the username isn't already being used.

function buildUniqueUsername(first, last, usedUsernames) {
  let username;

  do {
    username = buildUsername(first, last);
  } while (usedUsernames.has(username));

  usedUsernames.add(username);

  return username;
}


// Builds the person's old usernames.

function buildUsernameHistory(
  first,
  last,
  createdDate,
  accountAgeDays,
  currentUsername
) {

  // Only older accounts can have username history.
  const canHaveChanged = accountAgeDays > 400;

  const changeCount =
    canHaveChanged && Math.random() < 0.55
      ? randomInt(1, 2)
      : 0;

  // No old usernames, so just return the current one.
  if (changeCount === 0) {
    return [{ username: currentUsername, date: createdDate }];
  }

  const offsets = [];

  // Pick when the old usernames were used.
  for (let i = 0; i < changeCount; i++) {
    offsets.push(randomInt(25, accountAgeDays - 25));
  }

  offsets.sort((a, b) => b - a);

  // Keep the usernames in this history unique.
  const usedHistoryNames = new Set([currentUsername]);

  const history = offsets.map((off) => {
    let username;

    // Keep trying until we get a different username.
    do {
      username = buildUsername(first, last);
    } while (usedHistoryNames.has(username));

    usedHistoryNames.add(username);

    return {
      username,
      date: daysAgo(off)
    };
  });

  // Add the current username last.
  const newestOldUsername = offsets[offsets.length - 1];

  history.push({
    username: currentUsername,
    date: daysAgo(randomInt(15, newestOldUsername))
  });

  return history;
}


// Creates a few contacts for the applicant.

function generateConnections() {
  const count = randomInt(2, 3);
  const used = new Set();
  const list = [];

  for (let i = 0; i < count; i++) {
    let first;
    let last;
    let name;

    // Don't add the same person twice.
    do {
      first = pick(FIRST_NAMES);
      last = pick(LAST_NAMES);
      name = `${first} ${last}`;
    } while (used.has(name));

    used.add(name);

    list.push({
      first,
      last,
      name,
      gender: NAME_GENDER[first],
      relation: pick(RELATIONS),
      phone: generatePhone(),
      personality: pick(PERSONALITY_TYPES)
    });
  }

  return list;
}


// Creates another person with similar information.

function generateDecoyPerson(official) {
  let first = official.first;
  let last = official.last;

  // Change either their first or last name.
  if (Math.random() < 0.5) {
    last = pickDifferent(LAST_NAMES, official.last);
  } else {
    first = pickDifferent(FIRST_NAMES, official.first);
  }

  const age = randomInt(18, 33);
  const birth = generateBirthDate(age);

  return {
    name: `${first} ${last}`,
    birthday: formatDate(
      makeDate(birth.birthYear, birth.birthMonth, birth.birthDay)
    ),
    school: pick(SCHOOLS),
    graduationYear: birth.birthYear + 18
  };
}




/* ======================
    4. CASE GENERATION
   ====================== */

/*
  Creates a new case.

  The case can be legitimate, similar to another person,
  or have one of the fake case types.
*/

function generateCase() {

  // Generate the real person this case is based on.
  const official = generateOfficialPerson();

  // Start the applicant's claims with the correct information.
  const claims = {
    name: official.name,
    age: official.age,
    birthday: official.birthday,
    occupation: official.occupation,
    school: official.school,
    graduationYear: official.graduationYear,
    username: official.username,
    reason: pick(REASON_GENERIC)
  };


  // Pick the type of case.
  const roll = Math.random();
  let caseType;

  if (roll < 0.15) {
    caseType = "legitimate_clean";
  } else if (roll < 0.30) {
    caseType = "legitimate_normal";
  } else if (roll < 0.40) {
    caseType = "legitimate_moved";
  } else if (roll < 0.52) {
    caseType = "similar_identity";
  } else {
    caseType = pick(FAKE_CASE_TYPES);
  }


  // Extra data used by certain case types.
  let isLegitimate = true;
  let decoyPerson = null;
  let contradictionContact = null;
  let usernameHistoryOverride = null;
  let createdDateOverride = null;
  let movedFromRegion = null;
  let suspiciousUsernameChange = null;


  /* BIRTHDAY MISMATCH */

  if (caseType === "birthday_mismatch") {
    isLegitimate = false;

    let fakeMonth;
    let fakeDay;

    // Pick a different birthday.
    do {
      fakeMonth = randomInt(1, 12);
      fakeDay = randomInt(1, 28);
    } while (
      fakeMonth === official.birthMonth &&
      fakeDay === official.birthDay
    );

    // Change the applicant's claim only.
    claims.birthday = formatDate(
      makeDate(official.birthYear, fakeMonth, fakeDay)
    );


  /* SCHOOL MISMATCH */

  } else if (caseType === "school_mismatch") {
    isLegitimate = false;

    // Give the applicant the wrong school.
    claims.school = pickDifferent(
      SCHOOLS,
      official.school
    );


  /* TIMELINE MISMATCH */

  } else if (caseType === "timeline_mismatch") {
    isLegitimate = false;

    let offset;

    // Move the graduation year by 1-4 years.
    do {
      offset = randomInt(-4, 4);
    } while (offset === 0);

    claims.graduationYear = official.graduationYear + offset;


  /* SUSPICIOUS USERNAME */

  } else if (caseType === "username_suspicious") {
    isLegitimate = false;

    // Make the username change recent.
    const changeDaysAgo = randomInt(2, 9);

    // Generate a suspicious-looking username.
    const suspiciousHandle = pick([
      `user${randomInt(100000, 999999)}`,
      `acct${randomInt(10000, 99999)}`,
      `${official.last.toLowerCase()}${randomInt(1000, 9999)}new`,
      `temp_${randomInt(100, 999)}`
    ]);

    // Replace the normal username history.
    usernameHistoryOverride = [
      {
        username: official.username,
        date: official.createdDate
      },
      {
        username: suspiciousHandle,
        date: daysAgo(changeDaysAgo)
      }
    ];

    suspiciousUsernameChange = {
      from: official.username,
      to: suspiciousHandle,
      daysAgo: changeDaysAgo
    };

    claims.username = suspiciousHandle;


  /* ACCOUNT AGE MISMATCH */

  } else if (caseType === "account_age_mismatch") {
    isLegitimate = false;

    // Make the account look much newer.
    createdDateOverride = daysAgo(randomInt(5, 25));

    // Give the reason an older date that doesn't match the account.
    const falseYear =
      official.createdDate.year - randomInt(2, 5);

    claims.reason =
      `I've been part of this community since ${falseYear} and would like official access now.`;


  /* CONNECTION CONTRADICTION */

  } else if (caseType === "connection_contradiction") {
    isLegitimate = false;

    // Use a real contact but give the relationship incorrectly.
    const contact = pick(official.connections);
    const claimedRelation = pickDifferent(
      RELATIONS,
      contact.relation
    );

    contradictionContact = {
      contact,
      claimedRelation
    };

    claims.reason =
      `My ${claimedRelation} ${contact.name} already lives here and told me to apply.`;


  /* SIMILAR IDENTITY */

  } else if (caseType === "similar_identity") {
    // Legitimate case with another similar-looking person.
    isLegitimate = true;

    decoyPerson = generateDecoyPerson(official);


  /* LEGITIMATE MOVED */

  } else if (caseType === "legitimate_moved") {
    isLegitimate = true;

    // Some older evidence may be from their previous location.
    movedFromRegion = pick(OUT_OF_REGION);

    claims.reason =
      "Just moved to the area, looking to get plugged in somewhere.";
  }


  // Put everything for this case into one object.
  const caseData = {
    number: `APPLICANT #${randomInt(1000, 9999)}`,
    caseType,
    isLegitimate,
    official,
    claims,
    decoyPerson,
    contradictionContact,
    movedFromRegion,
    suspiciousUsernameChange,

    records: generateRecords(
      official,
      decoyPerson
    ),

    // Use the fake history when one was created.
    accountHistory: {
      created: createdDateOverride || official.createdDate,
      usernameHistory:
        usernameHistoryOverride || official.usernameHistory
    },

    // Tracks calls made to each contact.
    callCounts: {}
  };


  // Generate the digital evidence after the case is set up.
  caseData.digitalFootprint =
    generateDigitalFootprint(caseData);

  return caseData;
}



/* ======================
  5. EVIDENCE GENERATION
   ====================== */


/*
   Makes the records the player can look through.

   The real person is always in here.
   Decoys can show up too.
*/
function generateRecords(official, decoyPerson) {

  // Real applicant.
  const entries = [
    {
      name: official.name,
      dob: official.birthday,
      school: official.school,
      graduationYear: official.graduationYear
    }
  ];


  // Add the decoy if we have one.
  if (decoyPerson) {
    entries.push({
      name: decoyPerson.name,
      dob: decoyPerson.birthday,
      school: decoyPerson.school,
      graduationYear: decoyPerson.graduationYear
    });


  // Sometimes throw in a random person too.
  } else if (Math.random() < 0.18) {
    const noiseFirst =
      pickDifferent(FIRST_NAMES, official.first);

    const noiseAge = randomInt(18, 45);

    entries.push({
      name: `${noiseFirst} ${official.last}`,
      dob: formatDate(
        makeDate(
          GAME_YEAR - noiseAge,
          randomInt(1, 12),
          randomInt(1, 28)
        )
      ),
      school: pickDifferent(
        SCHOOLS,
        official.school
      ),
      graduationYear:
        GAME_YEAR -
        noiseAge -
        randomInt(4, 20)
    });
  }


  // Shuffle it so the real person isn't always first.
  return shuffleArray(entries);
}


/*
   Makes a random person for the feed.
*/
function buildFeedUser(official, usedUsernames) {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);

  const username = buildUniqueUsername(
    first,
    last,
    usedUsernames
  );

  return {
    name: `${first} ${last}`,
    username
  };
}


/*
   Makes a username similar to the applicant's.
   Used for the impersonation stuff.
*/
function buildSimilarUsername(official, usedUsernames) {
  const options = [
    `${official.first.toLowerCase()}_${official.last.toLowerCase()}`,
    `${official.first.toLowerCase()}${official.last.toLowerCase()}`,
    `${official.first.toLowerCase()}.${official.last.toLowerCase()}`,
    `${official.first.charAt(0).toLowerCase()}${official.last.toLowerCase()}`
  ];

  let username;

  // Don't accidentally use the real username.
  do {
    username = pick(options);
  } while (
    usedUsernames.has(username) ||
    username === official.username
  );

  usedUsernames.add(username);

  return username;
}


/*
   Makes the whole social media feed.

   Some of this is actual evidence.
   Some of it is just there to make the feed feel normal.
*/
function generateDigitalFootprint(caseData) {
  const official = caseData.official;
  const posts = [];

  // Keep track of usernames we've already used.
  const usedUsernames = new Set([
    official.username
  ]);


  // Add some birthday/graduation stuff.
  if (Math.random() < 0.7) {
    posts.push(
      pick([birthdayPost, graduationPost])(
        official,
        usedUsernames
      )
    );
  } else {
    posts.push(
      birthdayPost(
        official,
        usedUsernames
      )
    );

    posts.push(
      graduationPost(
        official,
        usedUsernames
      )
    );
  }


  // Nickname stuff, if they have one.
  if (official.nickname && Math.random() < 0.8) {
    posts.push(
      nicknamePost(
        official,
        usedUsernames
      )
    );
  }


  // People who moved get these two posts.
  if (caseData.caseType === "legitimate_moved") {
    posts.push(
      movingAwayPost(official)
    );

    posts.push(
      settledInPost(official)
    );
  }


  // Just some extra stuff about their life.
  if (Math.random() < 0.45) {
    posts.push(
      jobPost(official)
    );
  }

  if (Math.random() < 0.35) {
    posts.push(
      eventPost(official)
    );
  }


  // Add some random posts so the feed isn't all clues.
  pickSome(
    FILLER_POSTS,
    randomInt(2, 3)
  ).forEach((postText) => {
    const user = buildFeedUser(
      official,
      usedUsernames
    );

    posts.push({
      handle: `@${user.username}`,
      date: formatDate(
        daysAgo(randomInt(3, 250))
      ),
      text: postText,
      likes: randomInt(0, 40)
    });
  });


  // Sometimes there's just a random scam post.
  if (Math.random() < 0.25) {
    const scammer = buildFeedUser(
      official,
      usedUsernames
    );

    posts.push({
      handle: `@${scammer.username}`,
      date: formatDate(
        daysAgo(randomInt(1, 200))
      ),
      text: pick(SPAM_POSTS),
      likes: randomInt(0, 3)
    });
  }


  // Fake cases can sometimes interact with a scam.
  if (!caseData.isLegitimate && Math.random() < 0.35) {
    posts.push({
      handle: `@${official.username}`,
      date: formatDate(
        daysAgo(randomInt(5, 180))
      ),
      text: pick(SPAM_POSTS),
      likes: randomInt(0, 5),
      reply: {
        handle: `@${official.username}`,
        text: pick(SCAM_REPLIES)
      }
    });
  }


  /*
     Sometimes someone else has a really similar username.

     This isn't always a fake case though.
     Don't want the player assuming similar = fake.
  */
  if (Math.random() < 0.12) {
    const similarUsername =
      buildSimilarUsername(
        official,
        usedUsernames
      );

    posts.push({
      handle: `@${similarUsername}`,
      date: formatDate(
        daysAgo(randomInt(10, 200))
      ),
      text: pick(SIMILAR_USERNAME_POSTS),
      likes: randomInt(2, 25)
    });
  }


  // Shuffle everything at the end.
  return shuffleArray(posts);
}


/*
   Makes a post about the applicant's birthday.
*/
function birthdayPost(official, usedUsernames) {
  const user = buildFeedUser(
    official,
    usedUsernames
  );

  const line = pick([
    `happy birthday ${official.nickname || official.first}!! hope it's a good one`,
    `HBD ${official.nickname || official.first} 🎉 can't believe ${official.pronoun.poss} birthday snuck up on me again`,
    `happy bday to my favorite ${pick(RELATIONS)}, love you ${official.nickname || official.first}`
  ]);

  return {
    handle: `@${user.username}`,
    date: formatDate(
      makeDate(
        GAME_YEAR,
        official.birthMonth,
        official.birthDay
      )
    ),
    text: line,
    likes: randomInt(5, 60),

    // Reply from the actual applicant.
    reply: {
      handle: `@${official.username}`,
      text: pick([
        "thank you!!",
        "means a lot",
        "love you too"
      ])
    }
  };
}


/*
   Makes a post about their high school.
*/
function graduationPost(official, usedUsernames) {
  const user = buildFeedUser(
    official,
    usedUsernames
  );

  return {
    handle: `@${user.username}`,
    date: formatDate(
      makeDate(
        official.graduationYear,
        6,
        randomInt(1, 15)
      )
    ),
    text: pick([
      `throwback to graduating ${official.school}, feels like forever ago`,
      `can't believe it's already been a few years since ${official.school}`,
      `miss the ${official.school} days ngl`
    ]),
    likes: randomInt(10, 80)
  };
}


/*
   Makes a post using their nickname.
*/
function nicknamePost(official, usedUsernames) {
  const user = buildFeedUser(
    official,
    usedUsernames
  );

  return {
    handle: `@${user.username}`,
    date: formatDate(
      daysAgo(randomInt(5, 300))
    ),
    text: pick([
      `${official.nickname}, you still owe me five bucks lol`,
      `tagged ${official.nickname} in a post: "throwback to last summer"`,
      `can't hang out with ${official.nickname} enough honestly`
    ]),
    likes: randomInt(2, 30)
  };
}


/*
   Post about leaving their old area.
*/
function movingAwayPost(official) {
  return {
    handle: `@${official.username}`,
    date: formatDate(
      daysAgo(randomInt(90, 150))
    ),
    text: `can't believe we're actually leaving ${currentCaseMovedRegion(official)}. wild chapter`,
    likes: randomInt(10, 50)
  };
}


/*
   These need the moved-from region from the current case.
*/


// Get the old region from the current case.

function currentCaseMovedRegion(official) {
  if (
    state.currentCase &&
    state.currentCase.official === official &&
    state.currentCase.movedFromRegion
  ) {
    return state.currentCase.movedFromRegion;
  }

  // Just in case something went wrong.
  return pick(OUT_OF_REGION);
}


/*
   Post about getting settled in.
*/
function settledInPost(official) {
  return {
    handle: `@${official.username}`,
    date: formatDate(
      daysAgo(randomInt(20, 60))
    ),
    text: pick([
      "finally feels like we're settled in around here",
      "still getting used to the area but starting to feel like home",
      "unpacked the last box today, officially moved in"
    ]),
    likes: randomInt(5, 35)
  };
}


/*
   Post about their job.
*/
function jobPost(official) {
  return {
    handle: `@${official.username}`,
    date: formatDate(
      daysAgo(randomInt(10, 400))
    ),
    text: pick([
      `first week as a ${official.occupation.toLowerCase()} in the books, exhausted but good`,
      `officially a ${official.occupation.toLowerCase()} now, wish me luck`,
      `three years in as a ${official.occupation.toLowerCase()} and still learning`
    ]),
    likes: randomInt(5, 45)
  };
}


/*
   Just a normal social post.
*/
function eventPost(official) {
  return {
    handle: `@${official.username}`,
    date: formatDate(
      daysAgo(randomInt(2, 120))
    ),
    text: pick([
      "at the fair this weekend, way more crowded than I expected",
      "concert last night was actually so good",
      "spent the whole weekend outside for once, feels nice"
    ]),
    likes: randomInt(3, 50)
  };
}


/* ================================================================
   6. PHONE PERSONALITIES
   ================================================================ */


/*
   Different ways contacts can act on the phone.
*/
const PERSONALITY_TYPES = [
  "friendly",
  "casual",
  "confused",
  "busy",
  "suspicious",
  "annoyed",
  "protective",
  "barely_knows",
  "willing_to_help",
  "vague",
  "stops_responding"
];


/*
   The different responses for each personality.

   They change depending on how many times you call.
*/
const PERSONALITY_PROFILES = {

  friendly: {
    opener: [
      "Oh hey, yeah!",
      "Hi! Yeah, of course."
    ],
    afterRelation: [
      "Is everything okay? Did something happen?",
      "Why do you ask?"
    ],
    repeat: [
      "Hey again! Everything alright over there?"
    ],
    thirdPlus: [
      "Hope everything's okay, you keep calling."
    ],
    noAnswerAfter: null
  },

  casual: {
    opener: [
      "hey, yeah that's me",
      "yup, what's up"
    ],
    afterRelation: [
      "why, what's going on",
      "everything good?"
    ],
    repeat: [
      "oh hey, didn't we just talk about this"
    ],
    thirdPlus: [
      "you called again, everything ok?"
    ],
    noAnswerAfter: null
  },

  confused: {
    opener: [
      "Uh, yes? Who is this again?",
      "Sorry, who's calling?"
    ],
    afterRelation: [
      "Wait, what is this about exactly?",
      "I'm not totally sure I follow."
    ],
    repeat: [
      "Sorry, did we already talk? I don't really remember."
    ],
    thirdPlus: [
      "I'm getting a little lost, honestly."
    ],
    noAnswerAfter: null
  },

  busy: {
    opener: [
      "Yeah, kind of a bad time, can you make it quick?",
      "In the middle of something, what do you need?"
    ],
    afterRelation: [
      "Look, I really can't talk long right now.",
      "Can we make this fast?"
    ],
    repeat: [
      "I told you, I'm busy right now."
    ],
    thirdPlus: null,

    // They stop answering after this call.
    noAnswerAfter: 2
  },

  suspicious: {
    opener: [
      "...who is this, and why are you asking about them?",
      "Why do you want to know that?"
    ],
    afterRelation: [
      "I don't really know why that's your business.",
      "Is something going on?"
    ],
    repeat: [
      "You're calling again? That's a little strange."
    ],
    thirdPlus: null,
    noAnswerAfter: 3
  },

  annoyed: {
    opener: [
      "Yeah? What.",
      "Yeah, that's me, what do you want."
    ],
    afterRelation: [
      "Okay. And?",
      "Is there a point to this."
    ],
    repeat: [
      "I already answered this."
    ],
    thirdPlus: null,
    noAnswerAfter: 3
  },

  protective: {
    opener: [
      "Yeah, why? Is everything okay?",
      "Yes - is something wrong?"
    ],
    afterRelation: [
      "I want to know why you're asking before I say more.",
      "I'm not going to say anything that gets them in trouble."
    ],
    repeat: [
      "I already told you what I know."
    ],
    thirdPlus: [
      "I'm not really comfortable talking about this anymore."
    ],
    noAnswerAfter: 4
  },

  barely_knows: {
    opener: [
      "Uh, kind of? Not super well.",
      "I mean, I know of them, not super close."
    ],
    afterRelation: [
      "Honestly I don't know much beyond that.",
      "I really can't say much, sorry."
    ],
    repeat: [
      "Like I said, I don't know them that well."
    ],
    thirdPlus: [
      "I really don't have anything else to tell you."
    ],
    noAnswerAfter: 3
  },

  willing_to_help: {
    opener: [
      "Yes, hi! Happy to help with whatever you need.",
      "Yeah, of course - what do you need to know?"
    ],
    afterRelation: [
      "Let me know if you need anything else too.",
      "Feel free to ask me anything."
    ],
    repeat: [
      "Still happy to help if you need more."
    ],
    thirdPlus: [
      "Anything else I can clear up for you?"
    ],
    noAnswerAfter: null
  },

  vague: {
    opener: [
      "Mm, yeah, I guess so.",
      "Sort of, yeah."
    ],
    afterRelation: [
      "I mean, it's kind of hard to explain.",
      "It's complicated, I guess."
    ],
    repeat: [
      "I don't really know what else to say."
    ],
    thirdPlus: [
      "I already said what I know, I think."
    ],
    noAnswerAfter: 3
  },

  stops_responding: {
    opener: [
      "Yeah, that's me.",
      "Hello?"
    ],
    afterRelation: [
      "I don't really want to get into this over the phone.",
      "Can we not do this right now."
    ],
    repeat: null,
    thirdPlus: null,

    // Answers once, then stops.
    noAnswerAfter: 1
  }
};


/*
   Turn the relationship into something they would actually say.
*/
function relationPhrase(relation, official) {
  const heShe = capitalize(
    official.pronoun.subj
  );

  switch (relation) {
    case "friend":
      return "Yeah, we're friends.";

    case "roommate":
      return "We're roommates.";

    case "coworker":
      return "We work together.";

    case "classmate":
      return "We went to school together.";

    case "neighbor":
      return "We live close to each other.";

    case "sibling":
      return "That's my sibling.";

    case "cousin":
      return `${heShe}'s my cousin.`;

    default:
      return "Yeah, I know them.";
  }
}


/*
   What they say when the applicant got the relationship wrong.

   Example:
   "We're roommates."
   "Uh... no we're not."
*/
function contradictionPushback(claimedRelation) {
  const lines = {
    roommate: "Roommates? No, we've never lived together.",
    sibling: "Sibling? No, we're not related at all.",
    coworker: "Coworkers? We've never worked together.",
    classmate: "Classmates? We didn't go to the same school.",
    neighbor: "Neighbors? No, we live nowhere near each other.",
    cousin: "Cousin? No, we're not related.",
    friend: "Friend's a strong word, we've met like twice."
  };

  return lines[claimedRelation] ||
    "That's not really how I'd put it.";
}


/*
   The actual relationship, for the contradiction case.
*/
function contradictionActual(actualRelation, official) {
  const heShe = capitalize(
    official.pronoun.subj
  );

  const lines = {
    roommate: "We're roommates, actually.",
    sibling: "We're siblings, actually.",
    coworker: "We used to work together.",
    classmate: "We went to school together.",
    neighbor: "We live pretty close to each other.",
    cousin: `${heShe}'s my cousin, actually.`,
    friend: "We're just friends."
  };

  return lines[actualRelation] ||
    "We just know each other from around.";
}


/*
   Builds one part of the phone conversation.
*/
function buildCallStage(
  caseData,
  contact,
  callNumber
) {
  // Get this contact's personality.
  const profile =
    PERSONALITY_PROFILES[contact.personality];


  /*
     Check if they've stopped answering yet.
  */
  if (
    profile.noAnswerAfter !== null &&
    callNumber >= profile.noAnswerAfter
  ) {
    return null;
  }


  // Get the applicant's info.
  const official = caseData.official;


  // Check if this is the contact from the contradiction case.
  const isContradiction =
    caseData.contradictionContact &&
    caseData.contradictionContact.contact.name ===
      contact.name;


  // Build the conversation one line at a time.
  const lines = [];


  /* ---------------- FIRST CALL ---------------- */

  if (callNumber === 0) {

    lines.push({
      speaker: "you",
      text: `Hi, is this ${contact.first}?`
    });

    lines.push({
      speaker: contact.name,
      text: pick(profile.opener)
    });

    lines.push({
      speaker: "you",
      text: `Do you know ${official.first}?`
    });


    // Special dialogue for the fake relationship case.
    if (isContradiction) {
      const claimed =
        caseData.contradictionContact.claimedRelation;

      lines.push({
        speaker: contact.name,
        text: `Yeah, I know ${official.pronoun.obj}.`
      });

      lines.push({
        speaker: "you",
        text:
          `The application says you're ${relationArticle(claimed)} ${claimed}.`
      });

      lines.push({
        speaker: contact.name,
        text:
          `${contradictionPushback(claimed)} ${contradictionActual(contact.relation, official)}`
      });

    } else {

      // Normal contacts just give their actual relationship.
      lines.push({
        speaker: contact.name,
        text: relationPhrase(
          contact.relation,
          official
        )
      });
    }


    // Finish the first call with their usual response.
    lines.push({
      speaker: contact.name,
      text: pick(profile.afterRelation)
    });


  /* ---------------- SECOND CALL ---------------- */

  } else if (callNumber === 1) {

    // Some personalities don't answer a second time.
    if (!profile.repeat) {
      return null;
    }

    lines.push({
      speaker: "you",
      text: "Hey, it's me again."
    });

    lines.push({
      speaker: contact.name,
      text: pick(profile.repeat)
    });


  /* ---------------- THIRD+ CALL ---------------- */

  } else {

    // Some people are done talking by this point.
    if (!profile.thirdPlus) {
      return null;
    }

    lines.push({
      speaker: "you",
      text: "Sorry, one more time -"
    });

    lines.push({
      speaker: contact.name,
      text: pick(profile.thirdPlus)
    });
  }


  // Send the finished dialogue back to the phone system.
  return lines;
}




/* ======================
   7. GAME STATE
   ====================== */


// Keeps track of stuff the game needs while you're playing.
const state = {
  // The case we're currently looking at
  currentCase: null,

  // The different sections the player can check.
  categories: [
    "records",
    "digital",
    "account",
    "connections"
  ],

  categoryIndex: 0,

  // Phone number currently being typed.
  dialBuffer: "",

  // Fake applicants accepted by mistake.
  fakeAccepted: 0,

  // Real applicants rejected by mistake.
  legitRejected: 0,

  // Total correct decisions.
  correctDecisions: 0
};


// How many mistakes the player can make before losing.
const LOSE_ON_FAKE_ACCEPTED = 3;
const LOSE_ON_LEGIT_REJECTED = 5;


// Names shown to the player for each category.
const CATEGORY_LABELS = {
  records: "RECORDS",
  digital: "DIGITAL FOOTPRINT",
  account: "ACCOUNT HISTORY",
  connections: "CONNECTED PEOPLE"
};





/* ======================
   8. SCREEN MANAGEMENT
   ====================== */

// Show one screen and hide the others.
function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((el) => {
      el.classList.remove("active");
    });

  document
    .getElementById(id)
    .classList.add("active");
}


// Check if we're currently on the investigation screen.
function isInvestigationActive() {
  return document
    .getElementById("screen-investigation")
    .classList
    .contains("active");
}



/* ======================
   9. AVATAR GENRATION
   ====================== */

/* Intended to be a placeholder. Still thinking of how I 
can make some type of avatar or pfps... */

// Turns a string into a number for the avatar seed.
function hashString(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash =
      (hash << 5) -
      hash +
      str.charCodeAt(i);

    hash |= 0;
  }

  return Math.abs(hash);
}


// Makes random numbers based on a seed.
// Same seed = same results.
function seededRandom(seed) {
  let value = seed;

  return function () {
    value =
      (value * 9301 + 49297) %
      233280;

    return value / 233280;
  };
}


// Colors the avatars can use.
const AVATAR_PALETTE = [
  "#ffb648",
  "#8b7cf6",
  "#ef5f56",
  "#5fd68a",
  "#5cc7e8",
  "#e9edf5"
];


// Draws the avatar on the canvas.
function drawAvatar(canvas, name) {
  const ctx = canvas.getContext("2d");
  const size = canvas.width;

  // Clear the old avatar first.
  ctx.clearRect(
    0,
    0,
    size,
    size
  );

  // Use the person's name so their avatar stays the same.
  const rand =
    seededRandom(hashString(name));

  // Dark background.
  ctx.fillStyle = "#1c1f26";
  ctx.fillRect(
    0,
    0,
    size,
    size
  );

  // Pick the main color.
  const primary =
    AVATAR_PALETTE[
      Math.floor(
        rand() *
        AVATAR_PALETTE.length
      )
    ];

  // Pick the second color.
  let secondary =
    AVATAR_PALETTE[
      Math.floor(
        rand() *
        AVATAR_PALETTE.length
      )
    ];

  // Make sure the two colors aren't the same.
  if (secondary === primary) {
    secondary =
      AVATAR_PALETTE[
        (AVATAR_PALETTE.indexOf(primary) + 1) %
        AVATAR_PALETTE.length
      ];
  }

  // Center of the canvas.
  const cx = size / 2;
  const cy = size / 2;

  ctx.save();

  // Rotate the middle shape a little.
  ctx.translate(cx, cy);
  ctx.rotate(rand() * Math.PI);

  ctx.fillStyle = primary;

  const coreSize = size * 0.5;

  // Main shape.
  ctx.fillRect(
    -coreSize / 2,
    -coreSize / 2,
    coreSize,
    coreSize
  );

  // Reset the canvas.
  ctx.restore();


  // Add a few shapes around the middle.
  const shapeCount =
    4 + Math.floor(rand() * 3);

  for (let i = 0; i < shapeCount; i++) {
    // Spread the shapes around the center.
    const angle =
      (Math.PI * 2 * i) /
        shapeCount +
      rand();

    const radius =
      size * 0.34;

    const x =
      cx +
      Math.cos(angle) *
        radius;

    const y =
      cy +
      Math.sin(angle) *
        radius;

    // Give each shape a slightly different size.
    const dotSize =
      size * 0.06 +
      rand() * size * 0.05;

    // Switch between the two colors.
    ctx.fillStyle =
      i % 2 === 0
        ? secondary
        : primary;

    // Randomly make it a circle or square.
    if (rand() > 0.5) {
      ctx.beginPath();

      ctx.arc(
        x,
        y,
        dotSize,
        0,
        Math.PI * 2
      );

      ctx.fill();
    } else {
      ctx.fillRect(
        x - dotSize / 2,
        y - dotSize / 2,
        dotSize,
        dotSize
      );
    }
  }

  // Small border around the avatar.
  ctx.strokeStyle =
    "rgba(255,255,255,0.08)";

  ctx.lineWidth = 2;

  ctx.strokeRect(
    1,
    1,
    size - 2,
    size - 2
  );
}






/* ======================
   10. APPLICANT SCREEN
   ====================== */

// Put the current applicant's info onto the screen.
function loadApplicantScreen(caseData) {
  // What the applicant says about themselves.
  const c = caseData.claims;

  document.getElementById("app-number")
    .textContent = caseData.number;

  document.getElementById("app-name")
    .textContent = c.name;

  document.getElementById("app-age")
    .textContent = c.age;

  document.getElementById("app-birthday")
    .textContent = c.birthday;

  document.getElementById("app-occupation")
    .textContent = c.occupation;

  document.getElementById("app-school")
    .textContent = c.school;

  document.getElementById("app-gradyear")
    .textContent = c.graduationYear;

  document.getElementById("app-username")
    .textContent = c.username;

  document.getElementById("app-reason")
    .textContent = c.reason;

  // Draw their avatar.
  drawAvatar(
    document.getElementById("app-avatar-canvas"),
    c.name
  );
}






/* =========================
   11. INVESTIGATION SCREEN
   ========================= */


// Load the investigation screen for the current case.
function loadInvestigationScreen(caseData) {
  const c = caseData.claims;

  document.getElementById("inv-number")
    .textContent = caseData.number;

  document.getElementById("inv-name")
    .textContent = c.name;

  document.getElementById("inv-age")
    .textContent = c.age;

  document.getElementById("inv-birthday")
    .textContent = c.birthday;

  document.getElementById("inv-school")
    .textContent = c.school;

  document.getElementById("inv-gradyear")
    .textContent = c.graduationYear;

  document.getElementById("inv-username")
    .textContent = c.username;

  drawAvatar(
    document.getElementById("inv-avatar-canvas"),
    c.name
  );

  // Clear notes from the last case.
  document.getElementById("notebook")
    .value = "";

  // Start back at Records.
  state.categoryIndex = 0;
  state.dialBuffer = "";

  renderCategory();
}


// Move between the evidence sections.
function changeCategory(direction) {
  const len = state.categories.length;

  state.categoryIndex =
    (state.categoryIndex + direction + len) %
    len;

  // Clear anything typed into the phone.
  state.dialBuffer = "";

  renderCategory();
}


// Show the right evidence for the current category.
function renderCategory() {
  const category =
    state.categories[
      state.categoryIndex
    ];

  // Show the category name.
  document.getElementById("category-label")
    .textContent =
      CATEGORY_LABELS[category];

  // Load the right section.
  if (category === "records") {
    renderRecords();
  } else if (category === "digital") {
    renderDigitalFootprint();
  } else if (category === "account") {
    renderAccountHistory();
  } else if (category === "connections") {
    renderConnections();
  }
}


// Show the official records.
function renderRecords() {
  const area =
    document.getElementById(
      "evidence-area"
    );

  const records =
    state.currentCase.records;

  // Turn each record into a card.
  const cards = records
    .map(
      (r) => `
        <div class="record-card">
          <p class="record-agency">${RECORDS_AGENCY}</p>

          <div class="field">
            <span class="field-label">NAME</span>
            <span class="field-value">${r.name}</span>
          </div>

          <div class="field">
            <span class="field-label">DATE OF BIRTH</span>
            <span class="field-value">${r.dob}</span>
          </div>

          <div class="field">
            <span class="field-label">SCHOOL</span>
            <span class="field-value">${r.school}</span>
          </div>

          <div class="field">
            <span class="field-label">GRADUATION YEAR</span>
            <span class="field-value">${r.graduationYear}</span>
          </div>
        </div>
      `
    )
    .join("");

  // Warn the player if more than one record matched.
  const note =
    records.length > 1
      ? `<p class="evidence-note">
           ${records.length} records matched this name.
           Compare each against the application.
         </p>`
      : "";

  // Replace the old evidence.
  area.innerHTML =
    note + cards;
}


// Show the social media posts.
function renderDigitalFootprint() {
  const area =
    document.getElementById(
      "evidence-area"
    );

  const posts =
    state.currentCase.digitalFootprint;

  area.innerHTML = posts
    .map(
      (p) => `
        <div class="post-card">
          <div class="post-head">
            <span class="post-handle">${p.handle}</span>
            <span class="post-date">${p.date}</span>
          </div>

          <p class="post-text">${p.text}</p>

          <div class="post-foot">
            ${p.likes} likes
          </div>

          ${
            p.reply
              ? `
                <div class="post-reply">
                  <span class="post-handle">
                    ${p.reply.handle}
                  </span>

                  <p class="post-text">
                    ${p.reply.text}
                  </p>
                </div>
              `
              : ""
          }
        </div>
      `
    )
    .join("");
}


// Show account creation and username history.
function renderAccountHistory() {
  const area =
    document.getElementById(
      "evidence-area"
    );

  const history =
    state.currentCase.accountHistory;

  // Make a row for each old username.
  const usernameRows =
    history.usernameHistory
      .map(
        (entry) => `
          <div class="history-row">
            <span class="history-username">
              ${entry.username}
            </span>

            <span class="history-date">
              ${formatDate(entry.date)}
            </span>
          </div>
        `
      )
      .join("");

  // Account date + username history.
  area.innerHTML = `
    <div class="record-card">
      <div class="field">
        <span class="field-label">ACCOUNT CREATED</span>
        <span class="field-value">
          ${formatDate(history.created)}
        </span>
      </div>
    </div>

    <div class="record-card">
      <p class="record-agency">
        USERNAME HISTORY
      </p>

      ${usernameRows}
    </div>
  `;
}


// Show the applicant's contacts and phone dialer.
function renderConnections() {
  const area =
    document.getElementById(
      "evidence-area"
    );

  const caseData =
    state.currentCase;

  // Make a card for each contact.
  const referenceCards =
    caseData.official.connections
      .map((c) => {
        let displayRelation =
          c.relation;

        // Show the claimed relationship for the contradiction case.
        if (
          caseData.contradictionContact &&
          caseData.contradictionContact.contact.name ===
            c.name
        ) {
          displayRelation =
            caseData.contradictionContact.claimedRelation;
        }

        return `
          <button
            class="reference-card"
            data-phone="${c.phone}"
          >
            <span class="reference-name">
              ${c.name}
            </span>

            <span class="reference-relation">
              ${displayRelation}
            </span>

            <span class="reference-phone">
              ${c.phone}
            </span>
          </button>
        `;
      })
      .join("");

  // Build the dialer.
  area.innerHTML = `
    <p class="evidence-note">
      REFERENCES
    </p>

    <div class="reference-list">
      ${referenceCards}
    </div>

    <p class="evidence-note">
      DIAL A NUMBER
    </p>

    <div class="dialer">
      <div
        class="dial-display"
        id="dial-display"
      >
        &nbsp;
      </div>

      <div class="dialpad">
        ${
          [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "clear", "0", "call"
          ]
            .map((key) => {
              // CLEAR and CALL need their own buttons.
              if (key === "clear") {
                return `
                  <button
                    class="dial-key dial-key-wide"
                    data-key="clear"
                  >
                    CLEAR
                  </button>
                `;
              }

              if (key === "call") {
                return `
                  <button
                    class="dial-key dial-key-wide dial-key-call"
                    data-key="call"
                  >
                    CALL
                  </button>
                `;
              }

              return `
                <button
                  class="dial-key"
                  data-key="${key}"
                >
                  ${key}
                </button>
              `;
            })
            .join("")
        }
      </div>
    </div>

    <div id="transcript-area"></div>
  `;


  // Clicking a contact fills in their number.
  area
    .querySelectorAll(".reference-card")
    .forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          state.dialBuffer =
            normalizeDigits(
              btn.dataset.phone
            );

          updateDialDisplay();
        }
      );
    });


  // Handle the dialer buttons.
  area
    .querySelectorAll(".dial-key")
    .forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const key =
            btn.dataset.key;

          if (key === "clear") {
            clearDial();
          } else if (key === "call") {
            placeCall();
          } else {
            appendDialDigit(key);
          }
        }
      );
    });

  // Update the number shown on the dialer.
  updateDialDisplay();
}





/* ======================
   12. PHONE CALLS
   ====================== */


/*
   Adds a number to the dialer.

   10 digits is enough for a normal phone number
*/
function appendDialDigit(digit) {
  if (state.dialBuffer.length >= 10) {
    return;
  }

  state.dialBuffer += digit;

  updateDialDisplay();
}


/*
   Deletes the last number that was typed.

   slice(0, -1) just removes the last character
*/
function removeDialDigit() {
  state.dialBuffer =
    state.dialBuffer.slice(0, -1);

  updateDialDisplay();
}


/*
   Clears the whole dialer

   Also clears the old conversation because we're starting over
*/
function clearDial() {
  state.dialBuffer = "";

  updateDialDisplay();

  const transcriptArea =
    document.getElementById(
      "transcript-area"
    );

  if (transcriptArea) {
    transcriptArea.innerHTML = "";
  }
}


/*
   Updates the number shown on the phone

   dialBuffer is the actual value, this just shows it
*/
function updateDialDisplay() {
  const display =
    document.getElementById(
      "dial-display"
    );

  /*
     The display won't exist on other screens, so just stop here
  */
  if (!display) {
    return;
  }

  display.textContent =
    state.dialBuffer.length
      ? state.dialBuffer
      : "\u00A0";
}


/*
   Tries to call whatever number is in the dialer.

   Basically:
   - make sure there's a number
   - find the person
   - figure out which call this is
   - show the right dialogue
*/
function placeCall() {
  const transcriptArea =
    document.getElementById(
      "transcript-area"
    );

  if (!transcriptArea) {
    return;
  }

  const dialed =
    state.dialBuffer;

  const caseData =
    state.currentCase;

  /*
     Check the applicant's contacts for this number

     normalizeDigits() means "(555) 012-3456" and
     "5550123456" count as the same number
  */
  const match =
    caseData.official.connections.find(
      (c) =>
        normalizeDigits(c.phone) ===
        dialed
    );


  // Can't call if nothing was entered
  if (!dialed) {
    transcriptArea.innerHTML =
      `<p class="evidence-note">
        Dial a number first.
      </p>`;

    return;
  }


  /*
     The player can type a number instead of clicking a contact.
     If it isn't one of the known numbers, nobody answers
  */
  if (!match) {
    transcriptArea.innerHTML =
      `<p class="evidence-note">
        Nobody picks up. Might be the wrong number.
      </p>`;

    return;
  }


  /*
     Keep track of how many times we've called this person.

     First call = 0
     second call = 1
     etc.

     This lets the different personalities change what they say
  */
  const callNumber =
    caseData.callCounts[match.phone] || 0;

  const lines =
    buildCallStage(
      caseData,
      match,
      callNumber
    );

  /*
     Increase the count now so the next call uses the next stage
  */
  caseData.callCounts[match.phone] =
    callNumber + 1;


  /*
     Some people eventually stop answering.
     buildCallStage() returns null when that happens
  */
  if (!lines) {
    transcriptArea.innerHTML =
      `<p class="evidence-note">
        No answer. Might not want to talk to you anymore.
      </p>`;

    return;
  }


  /*
     Turn the dialogue into HTML

     Player lines get their own class so they can look different
     from the other person's messages
  */
  transcriptArea.innerHTML = `
    <div class="transcript">
      ${
        lines
          .map(
            (line) => `
              <div
                class="transcript-line ${
                  line.speaker === "you"
                    ? "transcript-you"
                    : ""
                }"
              >
                <span class="transcript-speaker">
                  ${
                    line.speaker === "you"
                      ? "YOU"
                      : line.speaker
                  }
                </span>

                <span class="transcript-text">
                  ${line.text}
                </span>
              </div>
            `
          )
          .join("")
      }
    </div>
  `;
}


/* =======================
   13. DECISION & RESULT
   ======================= */

/*
   The little explanation shown after each decision

   Keeping them here makes the result code less messy
*/
const RESULT_EXPLANATIONS = {
  legitimate_clean:
    "The application matched the records. Nothing here was off.",

  legitimate_normal:
    "The application matched the records. A few things looked worth a second glance, but they checked out.",

  legitimate_moved:
    "The application matched the records. The applicant recently moved here, which explains the out-of-region post.",

  similar_identity:
    "The applicant matched their own record. The other name in the system just belonged to someone else.",

  birthday_mismatch:
    "The birthday on the application didn't match the official record.",

  school_mismatch:
    "The school on the application didn't match the official record.",

  timeline_mismatch:
    "The graduation year on the application didn't line up with the record.",

  username_suspicious:
    "The account switched to a generic, newly made-looking username right before applying.",

  account_age_mismatch:
    "The account was created recently, not years ago like the application claimed.",

  connection_contradiction:
    "The reference didn't back up the relationship the application described."
};


/*
   Handles the player's final choice

   Then it figures out if they got it right or not
*/
function makeDecision(decision) {
  const caseData =
    state.currentCase;

  /*
     Correct if:
     - accepted a real applicant
     - rejected a fake one
  */
  const wasCorrect =
    (decision === "accept" &&
      caseData.isLegitimate) ||
    (decision === "reject" &&
      !caseData.isLegitimate);


  if (wasCorrect) {
    // Nice, got it right
    state.correctDecisions++;

  } else if (decision === "accept") {
    /*
       Letting a fake applicant through counts against the player
    */
    state.fakeAccepted++;

  } else {
    /*
       Rejecting a real applicant has its own counter
    */
    state.legitRejected++;
  }

  // Show the result before moving on
  showResultScreen(
    decision,
    wasCorrect,
    caseData
  );
}


/*
   Updates the result screen after a decision

   makeDecision() already figured out if it was right or wrong,
   this just puts everything on the screen
*/
function showResultScreen(
  decision,
  wasCorrect,
  caseData
) {
  const panel =
    document.getElementById(
      "result-panel"
    );

  /*
     Remove the old result class first
     Otherwise the previous result can stick around
  */
  panel.classList.remove(
    "result-correct",
    "result-incorrect"
  );

  // Add the right one for this result
  panel.classList.add(
    wasCorrect
      ? "result-correct"
      : "result-incorrect"
  );

  document.getElementById(
    "result-verdict"
  ).textContent =
    wasCorrect
      ? "CORRECT"
      : "INCORRECT";

  document.getElementById(
    "result-action"
  ).textContent =
    decision === "accept"
      ? "Applicant accepted."
      : "Applicant rejected.";

  /*
     Use the case type to grab the matching explanation
  */
  document.getElementById(
    "result-explanation"
  ).textContent =
    RESULT_EXPLANATIONS[
      caseData.caseType
    ] || "";

  /*
     Show the current mistake counts

     Example: 2 / 3 means two fake applicants have been accepted
  */
  document.getElementById(
    "score-fake-accepted"
  ).textContent =
    `${state.fakeAccepted} / ${LOSE_ON_FAKE_ACCEPTED}`;

  document.getElementById(
    "score-legit-rejected"
  ).textContent =
    `${state.legitRejected} / ${LOSE_ON_LEGIT_REJECTED}`;

  document.getElementById(
    "score-correct"
  ).textContent =
    state.correctDecisions;

  showScreen(
    "screen-result"
  );
}


/* =================
   14. GAME OVER
   ================= */

/*
   Checks if the player has hit either lose condition

   Returns true if the game is over, false if we're still good
*/
function checkGameOver() {
  /*
     Three fake applicants getting through = game over
  */
  if (
    state.fakeAccepted >=
    LOSE_ON_FAKE_ACCEPTED
  ) {
    endGame(
      `You let ${LOSE_ON_FAKE_ACCEPTED} impersonators through.`
    );

    return true;
  }

  /*
     Five real applicants being rejected = game over
  */
  if (
    state.legitRejected >=
    LOSE_ON_LEGIT_REJECTED
  ) {
    endGame(
      `You turned away ${LOSE_ON_LEGIT_REJECTED} legitimate applicants.`
    );

    return true;
  }

  // We're still alive lol
  return false;
}





/*
   Shows the game over screen with the final scores.

   reasonText tells us why the player lost
*/
function endGame(reasonText) {
  document.getElementById(
    "gameover-reason"
  ).textContent = reasonText;

  document.getElementById(
    "final-fake-accepted"
  ).textContent =
    state.fakeAccepted;

  document.getElementById(
    "final-legit-rejected"
  ).textContent =
    state.legitRejected;

  document.getElementById(
    "final-correct"
  ).textContent =
    state.correctDecisions;

  showScreen(
    "screen-gameover"
  );
}


/* ===================
   15. EVENT WIRING
   =================== */

/*
   Hooks the buttons and keyboard controls up to the game.

   Most of the actual game logic is above. This just handles
   what happens when the player clicks or presses something
*/
function setupEventListeners() {

  // TITLE SCREEN
  // PLAY goes to the intro
  document
    .getElementById("btn-play")
    .addEventListener(
      "click",
      () => showScreen("screen-intro")
    );


  // HELP opens the instructions
  document
    .getElementById("btn-help")
    .addEventListener(
      "click",
      () => showScreen("screen-help")
    );


  // Back to the title screen
  document
    .getElementById("btn-help-back")
    .addEventListener(
      "click",
      () => showScreen("screen-title")
    );


  /*
     MUSIC TOGGLE

     Just flips the data attribute for now
  */
  document
    .getElementById("toggle-music")
    .addEventListener(
      "click",
      (e) => {
        const btn =
          e.currentTarget;

        btn.dataset.on =
          String(
            btn.dataset.on !== "true"
          );
      }
    );


  // BEGIN GAME
  // Start everything and load the first applicant
  document
    .getElementById("btn-begin")
    .addEventListener(
      "click",
      () => startNewGame()
    );


  // Opens the investigation screen
  document
    .getElementById("btn-investigate")
    .addEventListener(
      "click",
      () => {
        loadInvestigationScreen(
          state.currentCase
        );

        showScreen(
          "screen-investigation"
        );
      }
    );


  // Evidence buttons
  // -1 = back, +1 = forward
  document
    .getElementById("cat-prev")
    .addEventListener(
      "click",
      () => changeCategory(-1)
    );

  document
    .getElementById("cat-next")
    .addEventListener(
      "click",
      () => changeCategory(1)
    );


  // ACCEPT / REJECT
  // Let makeDecision() figure out if we got it right
  document
    .getElementById("btn-accept")
    .addEventListener(
      "click",
      () => makeDecision("accept")
    );

  document
    .getElementById("btn-reject")
    .addEventListener(
      "click",
      () => makeDecision("reject")
    );


  /*
     NEXT APPLICANT

     Check for game over first, otherwise make a new case
  */
  document
    .getElementById("btn-next")
    .addEventListener(
      "click",
      () => {
        if (checkGameOver()) {
          return;
        }

        state.currentCase =
          generateCase();

        loadApplicantScreen(
          state.currentCase
        );

        showScreen(
          "screen-applicant"
        );
      }
    );


  // PLAY AGAIN starts everything over
  document
    .getElementById("btn-play-again")
    .addEventListener(
      "click",
      () => startNewGame()
    );


  /*
     KEYBOARD CONTROLS

     Left / Right = switch evidence
     Numbers = type into the phone
     Backspace = delete
     Enter = call
  */
  document.addEventListener(
    "keydown",
    (e) => {

      // Don't let the keyboard controls work outside investigation
      if (!isInvestigationActive()) {
        return;
      }


      // If we're typing notes, don't mess with the keyboard controls
      // Would be annoying lol
      if (
        document.activeElement &&
        document.activeElement.tagName ===
          "TEXTAREA"
      ) {
        return;
      }


      // Arrow keys switch evidence
      if (e.key === "ArrowLeft") {
        changeCategory(-1);

      } else if (e.key === "ArrowRight") {
        changeCategory(1);

      // Phone controls only work in Connections
      } else if (
        state.categories[
          state.categoryIndex
        ] === "connections"
      ) {

        // Number keys add a digit
        if (/^[0-9]$/.test(e.key)) {
          appendDialDigit(e.key);

        // Backspace deletes one
        } else if (
          e.key === "Backspace"
        ) {
          removeDialDigit();

        // Enter = call
        } else if (
          e.key === "Enter"
        ) {
          placeCall();
        }
      }
    }
  );
}


/* ============
   16. INIT
   ============ */

/*
   Starts a fresh game.

   This also resets the scores so the last game doesn't carry over
*/
function startNewGame() {

  // Reset the counters
  state.fakeAccepted = 0;
  state.legitRejected = 0;
  state.correctDecisions = 0;

  // Make the first case
  state.currentCase =
    generateCase();

  // Put the applicant on screen
  loadApplicantScreen(
    state.currentCase
  );

  // And we're off
  showScreen(
    "screen-applicant"
  );
}


// Wait for the HTML to load before setting everything up
document.addEventListener(
  "DOMContentLoaded",
  () => {
    setupEventListeners();
  }
);
