import { InvalidInputError } from '../error/InvalidInputError';
import { v4 as uuidv4 } from 'uuid';

export class User {
  readonly id: string | undefined;
  readonly email: string;
  readonly emailVerified: Date | undefined;
  readonly phone: string | undefined;
  readonly phoneVerified: Date | undefined;
  readonly keywords: string[];
  readonly name: string | undefined;
  constructor(user: {
    id: string | undefined;
    email: string;
    emailVerified: Date | undefined;
    phone: string | undefined;
    phoneVerified: Date | undefined;
    keywords: string[] | undefined;
    name: string | undefined;
  }) {
    this.id = user.id || uuidv4();
    this.email = this.validateEmail(user.email);
    this.emailVerified = this.validateEmailVerified(user.emailVerified);
    this.phone = this.validatePhone(user.phone);
    this.phoneVerified = this.validateEmailVerified(user.phoneVerified);
    this.keywords = user.keywords || [];
    this.name = user.name;
  }

  private validateEmail(email: string): string {
    if (!User.emailRegex.test(email)) {
      throw new InvalidInputError(
        `email '${email}' does not follow regex pattern '${User.emailRegexPattern}'`,
      );
    }
    return email;
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

  private validateEmailVerified(date: Date | undefined): Date | undefined {
    if (!date) {
      return undefined;
    }

    if (date > new Date()) {
      throw new InvalidInputError(
        `email verified date ${date} cannot be in the future`,
      );
    }
    return date;
  }

  private validatePhoneVerified(date: Date | undefined): Date | undefined {
    if (!date) {
      return undefined;
    }

    if (date > new Date()) {
      throw new InvalidInputError(
        `phone verified date ${date} cannot be in the future`,
      );
    }
    return date;
  }

  private static emailRegexPattern =
    "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
  private static emailRegex = new RegExp(User.emailRegexPattern);
}
