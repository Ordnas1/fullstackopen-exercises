interface FunctionValues {
  listing: Array<number>;
  target: number;
}

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type RatingDescription =
  | "Excellent, keep it up!"
  | "Not too bad but could be better"
  | "You can do better, don't give up!";

const parseExerciseArgs = (args: Array<string>): FunctionValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  args.splice(0, 2);
  const target = Number(args.shift());
  const listing = args.map((num) => Number(num));

  return {
    listing,
    target,
  };
};

const calculateExercise = (
  listing: Array<number>,
  target: number
): ExerciseResults => {
  const periodLength = listing.length;
  const trainingDays = listing.filter((day) => day !== 0).length;
  const average = listing.reduce((a, b) => a + b, 0) / periodLength;

  let rating;
  let success;
  let ratingDescription: RatingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent, keep it up!";
    success = true;
  } else if (average < target && average >= target / 2) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
    success = false;
  } else {
    rating = 1;
    ratingDescription = "You can do better, don't give up!";
    success = false;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { listing, target } = parseExerciseArgs(process.argv);
  console.log(calculateExercise(listing, target));
} catch (error) {
  console.error("[ERROR]", error);
}

export default calculateExercise;
