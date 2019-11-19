import { Observable } from 'rxjs';
import { FormControlError } from './interfaces';

export class MaterialSelectOptions {
    constructor(arg: MaterialSelectOptions = {}) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) {
                    // (this as any)[property] = property === 'label' ? (arg as any)[property].replace('كود ', '')
                    //     : (arg as any)[property];
                    (this as any)[property] = (arg as any)[property];
                }
            }
        }
    }

    data?: Observable<any[]> | any[];
    label?: string;
    hint?: string;
    display?: string;
    value?: string;
    errorMessages?: FormControlError[];
    disabled ? = false;
}
