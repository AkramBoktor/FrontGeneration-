import { PipeTransform, Pipe } from '@angular/core';
import { FormControlError } from '../models/controls/interfaces';

@Pipe({
    name: 'getErrorMessages'
})
export class ControlErrorMessage implements PipeTransform {
    transform(formCtrl: any, customErrors: FormControlError[] = []): string {
        const formErrors = formCtrl.errors;
        let errorMessage;

        customErrors.forEach(e => {
            if (formCtrl.hasError(e.errorName)) {
                errorMessage = e.errorMessage;
            }
        });

        return errorMessage ? errorMessage : formCtrl.hasError('required') ? 'هذا الحقل مطلوب' :
            formCtrl.hasError('minlength') ? `Expected ${formErrors['minlength']['requiredLength']} but entered ${formErrors['minlength']['actualLength']}` :
            formCtrl.hasError('maxlength') ? `Expected ${formErrors['maxlength']['requiredLength']} but entered ${formErrors['maxlength']['actualLength']}` :
            formCtrl.hasError('min') ? `يجب ادخال قيمة اكبر من  ${formErrors['min']['min']}` :
            formCtrl.hasError('max') ? `يجب ادخال قيمة اقل من ${formErrors['max']['max']}` :
            // formCtrl.hasError('undefinedcode') ? `هذا الكود غير معرف` :
            formCtrl.hasError('email') ? 'Not a valid email' : '';
    }
}
