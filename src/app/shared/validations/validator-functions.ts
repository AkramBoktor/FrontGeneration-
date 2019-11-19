import { FormGroup } from '@angular/forms';
import { FormControlError } from '../models/controls/interfaces';

export abstract class ValidatorFunctions {
    static validateEqual(control1: string, control2: string) {
        return (group: FormGroup) => {
            const errors = group.controls[control2].errors;
            if (group.controls[control1].value === group.controls[control2].value) {
                if (errors) {
                    delete errors['validateEqual'];
                    return Object.keys(errors).length === 0 ? group.controls[control2].setErrors(null) :
                        group.controls[control2].setErrors({ ...errors });
                }
                return undefined;
            } else {
                return group.controls[control2].setErrors({ ...errors, validateEqual: true });
            }
        };
    }

    static validateGreater(control1: string, control2: string) {
        return (group: FormGroup) => {
            const errors = group.controls[control2].errors;
            if (group.controls[control1].value > group.controls[control2].value) {
                if (errors) {
                    delete errors['validateGreater'];
                    return Object.keys(errors).length === 0 ? group.controls[control2].setErrors(null) :
                        group.controls[control2].setErrors({ ...errors });
                }
                return undefined;
            } else {
                return group.controls[control2].setErrors({ ...errors, validateGreater: true });
            }
        };
    }

    static validateLess(control1: string, control2: string) {
        return (group: FormGroup) => {
            const errors = group.controls[control2].errors;
            if (group.controls[control1].value < group.controls[control2].value) {
                if (errors) {
                    delete errors['validateLess'];
                    return Object.keys(errors).length === 0 ? group.controls[control2].setErrors(null) :
                        group.controls[control2].setErrors({ ...errors });
                }
                return undefined;
            } else {
                return group.controls[control2].setErrors({ ...errors, validateLess: true });
            }
        };
    }

    static getErrorMessage(formCtrl: any, customErrors: FormControlError[] = []) {
        const formErrors = formCtrl.errors;
        let errorMessage;

        customErrors.forEach(e => {
            if (formCtrl.hasError(e.errorName)) {
                errorMessage = e.errorMessage;
            }
        });

        return errorMessage || formCtrl.hasError('required') ? 'يجب ادخال قيمة' :
            formCtrl.hasError('minlength') ? `Expected ${formErrors['minlength']['requiredLength']} but entered ${formErrors['minlength']['actualLength']}` :
                formCtrl.hasError('maxlength') ? `Expected ${formErrors['maxlength']['requiredLength']} but entered ${formErrors['maxlength']['actualLength']}` :
                    formCtrl.hasError('min') ? `Should enter value > ${formErrors['min']['min']}` :
                        formCtrl.hasError('max') ? `Should enter value < ${formErrors['max']['max']}` :
                            formCtrl.hasError('email') ? 'Not a valid email' : '';
    }
}
