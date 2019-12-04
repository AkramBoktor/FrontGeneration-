import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposes } from 'app/shared/models/registration-of-educational-buildings-used-for-general-purposes';

@Injectable()

export class RegistrationOfEducationalBuildingsUsedForGeneralPurposesService extends DataService<RegistrationOfEducationalBuildingsUsedForGeneralPurposes> {
    constructor(http: HttpClient) {
        super('registrationofeducationalbuildingsusedforgeneralpurposes', http);
    }
}

