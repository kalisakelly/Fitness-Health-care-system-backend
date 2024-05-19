function calculateBMI(mass, height) {
    // Ensure the input values are positive numbers
    if (mass <= 0 || height <= 0) {
        throw new Error("Mass and height must be positive numbers.");
    }

    // Calculate the BMI
    const bmi = mass / (height * height);

    // Return the calculated BMI
   return bmi


function calorieIntake(sex, height, mass, age) {
    let bmr;

    switch (sex.toLowerCase()) {
        case 'male':
            bmr = (10 * mass/1) + (6.25 * height) - (5 * age) + 5;
            bmr = bmr *1.2
            break;
        case 'female':
            bmr = (10 * mass) + (6.25 * height) - (5 * age) - 161;
            break;
        default:
            throw new Error("Invalid sex provided. Please specify 'male' or 'female'.");
    }

    return bmr;

}

function calculateDiabetesRisk(age, sex, ethnicity, fasting_glucose, systolic_blood_pressure, hdl, bmi, family_history) {
    const riskFactor = (0.028 * age) +
                       (0.661 * sex) +
                       (0.412 * ethnicity) +
                       (0.079 * fasting_glucose) +
                       (0.018 * systolic_blood_pressure) -
                       (0.039 * hdl) +
                       (0.07 * bmi) +
                       (0.481 * family_history) -
                       13.415;

    const riskPercentage = 100 / (1 + Math.exp(-1 * riskFactor));

    return riskPercentage;
}
calorieIntake("male",1.72,60,23)