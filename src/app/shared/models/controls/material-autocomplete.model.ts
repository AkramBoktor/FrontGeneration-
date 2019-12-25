import { Observable } from 'rxjs';
import { FormControlError } from './interfaces';
import { LookupModelAutoComplete } from './lookup.model';

export class MaterialAutocompleteOptions {
    constructor(arg: MaterialAutocompleteOptions = {}) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) {
                    (this as any)[property] = (arg as any)[property];
                }
            }
        }
    }

    dataService?: (filter: LookupModelAutoComplete) => Observable<LookupModelAutoComplete[]>;
    fetchModel?: any;
    label?: string;
    hint?: string;
    display?: string;
    value?: string;
    errorMessages?: FormControlError[];
    disabled ? = false;
}
