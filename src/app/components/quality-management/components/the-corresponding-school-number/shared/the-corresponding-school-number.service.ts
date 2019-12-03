import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TheCorrespondingSchoolNumber } from 'app/shared/models/the-corresponding-school-number';

@Injectable()

export class TheCorrespondingSchoolNumberService extends DataService<TheCorrespondingSchoolNumber> {
    constructor(http: HttpClient) {
        super('thecorrespondingschoolnumber', http);
    }
}

