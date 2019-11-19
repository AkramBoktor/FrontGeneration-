import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CompleteInsuranceDataOnASchool } from 'app/shared/models/complete-insurance-data-on-a-school';

@Injectable()

export class CompleteInsuranceDataOnASchoolService extends DataService<CompleteInsuranceDataOnASchool> {
    constructor(http: HttpClient) {
        super('completeinsurancedataonaschool', http);
    }
}

