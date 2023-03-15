import { InvalidInputError } from '../error/InvalidInputError';
import { v4 as uuidv4 } from 'uuid';

export class User {
  readonly email: string;
  readonly name: string;
  readonly keywords: string[];
  readonly id: string | undefined;
  readonly phone: string | undefined;
  constructor(user: {
    id: string | undefined;
    name: string;
    email: string;
    phone: string | undefined;
    keywords: string[] | undefined;
  }) {
    this.email = this.validateEmail(user.email);
    this.name = this.validateName(user.name);
    this.keywords = user.keywords || [];
    this.id = user.id || uuidv4();
    this.phone = this.validatePhone(user.phone);
  }

  private validateEmail(email: string): string {
    if (!User.emailRegex.test(email)) {
      throw new InvalidInputError(
        `email '${email}' does not follow regex pattern '${User.emailRegexPattern}'`,
      );
    }
    return email;
  }

  private validateName(name: string): string {
    if (name.length > 255) {
      throw new InvalidInputError(
        `name '${name}' is not less than 255 characters`,
      );
    }
    return name;
  }

  private validatePhone(phoneInput: string | undefined): string | undefined {
    if (!phoneInput) {
      return undefined;
    }
    const phoneNumber = phoneInput.replace(/\D/g, '');
    if (phoneNumber.length != 10) {
      throw new InvalidInputError(
        `phone number '${phoneInput}' is not 10 digits long`,
      );
    }
    return phoneNumber;
  }

  private static emailRegexPattern =
    "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
  private static emailRegex = new RegExp(User.emailRegexPattern);
}
