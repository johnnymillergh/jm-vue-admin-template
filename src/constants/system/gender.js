import StringUtil from '@/utils/string'

class Enum {
  constructor (value, description) {
    this.value = value
    this.description = description
    // Prevents the modification of existing property attributes and values,
    // and prevents the addition of new properties.
    Object.freeze(this)
  }
}

// noinspection SpellCheckingInspection
/**
 * Gender enum (26 options)
 * @see <a href="https://abcnews.go.com/blogs/headlines/2014/02/heres-a-list-of-58-gender-options-for-facebook-users/">Here's a List of 58 Gender Options for Facebook Users</a>
 * @see <a href="https://gender.wikia.org/">Gender Wiki</a>
 */
const Gender = {
  /**
   * Agender: Without gender
   */
  AGENDER: new Enum('Agender', 'Without gender'),
  /**
   * Androgyne: A non-binary gender identity associated with androgyny
   */
  ANDROGYNE: new Enum('Androgyne', 'A non-binary gender identity associated with androgyny'),
  /**
   * Bigender: A gender identity which can be literally translated as 'two genders' or 'double gender'
   */
  BIGENDER: new Enum('Bigender', 'A gender identity which can be literally translated as \'two genders\' or \'double gender\''),
  /**
   * Cisgender: A term for someone who has a gender identity that aligns with what they were assigned at birth
   */
  CISGENDER: new Enum('Cisgender',
    'A term for someone who has a gender identity that aligns with what they were assigned at birth'),
  /**
   * Cisgender Female: Cisgender female
   */
  CISGENDER_FEMALE: new Enum('Cisgender Female', 'Cisgender female'),
  /**
   * Cisgender Male: Cisgender male
   */
  CISGENDER_MALE: new Enum('Cisgender Male', 'Cisgender male'),
  /**
   * Female to Male: Female to male
   */
  FEMALE_TO_MALE: new Enum('Female to Male', 'Female to male'),
  /**
   * Gender Fluid: A gender identity which refers to a gender which varies over time
   */
  GENDER_FLUID: new Enum('Gender Fluid', 'A gender identity which refers to a gender which varies over time'),
  /**
   * Gender Nonconforming: Gender nonconforming
   */
  GENDER_NONCONFORMING: new Enum('Gender Nonconforming', 'Gender nonconforming'),
  /**
   * Gender Questioning: Gender questioning
   */
  GENDER_QUESTIONING: new Enum('Gender Questioning', 'Gender questioning'),
  /**
   * Gender Variant: Behavior or gender expression by an individual that does not match masculine and feminine gender norms
   */
  GENDER_VARIANT: new Enum('Gender Variant',
    'Behavior or gender expression by an individual that does not match masculine and feminine gender norms'),
  /**
   * Genderqueer: An umbrella term with a similar meaning to non-binary
   */
  GENDERQUEER: new Enum('Genderqueer', 'An umbrella term with a similar meaning to non-binary'),
  /**
   * Intersex: An intersex person has sex characteristics e.g.sexual anatomy, reproductive organs,
   * and/or chromosome patterns that do not fit the typical definition of male or female
   */
  INTERSEX: new Enum('Intersex',
    'An intersex person has sex characteristics e.g.sexual anatomy, reproductive organs, and/or chromosome ' +
    'patterns that do not fit the typical definition of male or female'),
  /**
   * Male to Female: Male to female
   */
  MALE_TO_FEMALE: new Enum('Male to Female', 'Male to female'),
  /**
   * Neither: Neither
   */
  NEITHER: new Enum('Neither', 'Neither'),
  /**
   * Neutrois: 'A non-binary gender identity which is often associated with a 'neutral' or 'null' gender
   */
  NEUTROIS: new Enum('Neutrois', 'A non-binary gender identity which is often associated with a \'neutral\' or \'null\' gender'),
  /**
   * Non-binary: Any gender identity which does not fit the male and female binary
   */
  NON_BINARY: new Enum('Non-binary', 'Any gender identity which does not fit the male and female binary'),
  /**
   * Other: Other gender
   */
  OTHER: new Enum('Other', 'Other gender'),
  /**
   * Pangender: A non-binary gender identity which refers to a vast and diverse multiplicity of genders in the same
   * individual that can extend infinitely, always within the person's own culture and life experience
   */
  PANGENDER: new Enum('Pangender',
    'A non-binary gender identity which refers to a vast and diverse multiplicity of genders in the same ' +
    'individual that can extend infinitely, always within the person\'s own culture and life experience'),
  /**
   * Transfeminine: A term used to describe transgender people who were assigned male at birth, but identify with
   * femininity to a greater extent than with masculinity
   */
  TRANSFEMININE: new Enum('Transfeminine',
    'A term used to describe transgender people who were assigned male at birth, but identify with ' +
    'femininity to a greater extent than with masculinity'),
  /**
   * Transgender: An umbrella term for anyone whose internal experience of gender does not match the gender they were
   * assigned at birth
   */
  TRANSGENDER: new Enum('Transgender',
    'An umbrella term for anyone whose internal experience of gender does not match the gender they were ' +
    'assigned at birth'),
  /**
   * Transgender Female: Transgender female
   */
  TRANSGENDER_FEMALE: new Enum('Transgender Female', 'Transgender female'),
  /**
   * Transgender Male: Transgender male
   */
  TRANSGENDER_MALE: new Enum('Transgender Male', 'Transgender male'),
  /**
   * Transgender Person: Transgender person
   */
  TRANSGENDER_PERSON: new Enum('Transgender Person', 'Transgender person'),
  /**
   * Transmasculine: A term used to describe transgender people who were assigned female at birth, but identify with
   * masculinity to a greater extent than with femininity
   */
  TRANSMASCULINE: new Enum('Transmasculine',
    'A term used to describe transgender people who were assigned female at birth, but identify with ' +
    'masculinity to a greater extent than with femininity'),
  /**
   * Two-Spirit: A culturally distinct gender that describes Indigenous North Americans who fulfils one of many mixed
   * gender roles found traditionally among many Native Americans and Canadian First Nations indigenous groups
   */
  TWO_SPIRIT: new Enum('Two-Spirit',
    'A culturally distinct gender that describes Indigenous North Americans who fulfils one of many mixed ' +
    'gender roles found traditionally among many Native Americans and Canadian First Nations indigenous groups'),
  /**
   * Get array of gender
   * @return {Array} an array of gender
   */
  getArray: () => {
    const array = []
    Object.keys(Gender).forEach(statusKey => {
      if (typeof Gender[statusKey] !== 'function') {
        array.push(Gender[statusKey])
      }
    })
    return array
  },
  /**
   * Get gender's value list
   * @return {*[]} gender's value list
   */
  getValueList: () => {
    return Gender.getArray().map(item => {
      return item.value
    })
  },
  /**
   * Get description by value
   * @param value gender value
   * @return {*} description of gender
   */
  getDescriptionByValue: (value) => {
    if (StringUtil.isEmpty(value)) {
      return
    }
    const description = Gender.getArray().find(item => {
      return item.value === value
    }).description
    if (!description) {
      return
    }
    return description
  }
}

Object.freeze(Gender)
export default Gender
