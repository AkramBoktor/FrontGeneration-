import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TheDateOfEducationForASupplyOrderIssuedToASchool } from 'app/shared/models/the-date-of-education-for-a-supply-order-issued-to-a-school';

@Injectable()

export class TheDateOfEducationForASupplyOrderIssuedToASchoolService extends DataService<TheDateOfEducationForASupplyOrderIssuedToASchool> {
    constructor(http: HttpClient) {
        super('thedateofeducationforasupplyorderissuedtoaschool', http);
    }
}

