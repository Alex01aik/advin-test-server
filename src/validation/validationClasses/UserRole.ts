import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'UserRole', async: false })
export class UserRole implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const roles = ['user', 'company'];
    return roles.includes(text);
  }

  defaultMessage(args: ValidationArguments) {
    return '$property is invalid';
  }
}
