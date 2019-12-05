import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RegistrationForm50 } from 'app/shared/models/registration-form-50';

@Injectable()

export class RegistrationForm50Service extends DataService<RegistrationForm50> {
    constructor(http: HttpClient) {
        super('registrationform50', http);
    }
}

