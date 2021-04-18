interface FormulaValues {
  height: number;
  weight: number;
}

const parseArgs = (args: Array<string>): FormulaValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  let result: string;
  const bmi = weight / (height * height);
  if (bmi < 18.5) {
    result = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    result = "Normal Weight";
  } else {
    result = "Overweight";
  }

  return result;
};

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.error("[ERROR]", error);
}

export default calculateBmi;
