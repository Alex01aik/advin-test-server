import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordFormat', async: true })
export class PasswordFormat implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const lowercaseRegexp = /^(?=.*[a-z]).+$/;
    const numberRegexp = /^(?=.*[0-9]).+$/;
    const uppercaseRegexp = /^(?=.*[A-Z]).+$/;
    const specialSymbolsRegexp =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

    const letterCase = lowercaseRegexp.test(text) && uppercaseRegexp.test(text);
    const lengthCase = text.length >= 8 && text.length <= 40;
    const specialSymbolCase = specialSymbolsRegexp.test(text);
    const numberCase = numberRegexp.test(text);
    return (
      lengthCase &&
      ((letterCase && numberCase) ||
        (letterCase && specialSymbolCase) ||
        (numberCase && specialSymbolCase))
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'Wrong $property!';
  }
}
