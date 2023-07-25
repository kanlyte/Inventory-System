//this class formarts a number to a string e.g 45000 to 45,000 you get it----------
export default class UI_Helper {
  static format(value) {
    return value.toLocaleString();
  }
}
