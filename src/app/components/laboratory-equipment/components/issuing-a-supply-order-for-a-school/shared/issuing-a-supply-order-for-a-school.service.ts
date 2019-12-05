import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IssuingASupplyOrderForASchool } from 'app/shared/models/issuing-a-supply-order-for-a-school';

@Injectable()

export class IssuingASupplyOrderForASchoolService extends DataService<IssuingASupplyOrderForASchool> {
    constructor(http: HttpClient) {
        super('issuingasupplyorderforaschool', http);
    }
}

