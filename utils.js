const Action = require('./Schema/Action');

const disallowedValues = [
  '[not provided]',
  'placeholder',
  '[[unknown]]',
  'not set',
  'not provided',
  'unknown',
  'undefined',
  'n/a'
];

const filterNullValuesFromObject = object =>
  Object
    .fromEntries(
      Object
        .entries(object)
        .filter(([_, v]) =>
          v !== null &&
          v !== '' &&
          typeof v !== 'undefined' &&
          (typeof v !== 'string' || !disallowedValues.includes(v.toLowerCase()) || !v.toLowerCase().includes('!$record'))));

const normalizePropertyName = key => key.toLowerCase().replace(/__c$/, '').replace(/^_+|_+$/g, '').replace(/_+/g, '_');

const goal = async(actions) => {

  // this is where the data will be written to the database

  try {
    await Action.insertMany(actions);
    console.log("value is stored to database");

  } catch (err) {
    console.log("it didn't work --- better luck next time ...! ");
  }
};

module.exports = {
  filterNullValuesFromObject,
  normalizePropertyName,
  goal
};
