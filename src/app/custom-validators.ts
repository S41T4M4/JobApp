import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function salaryRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null) {
      return null;
    }
    const value = control.value;
    return value > min && value < max ? null : { salaryRange: { min, max } };
  };
}
