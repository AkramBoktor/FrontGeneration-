import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BenefitsForTheHeirsOfAnEmployee } from 'app/shared/models/benefits-for-the-heirs-of-an-employee';

@Injectable()

export class BenefitsForTheHeirsOfAnEmployeeService extends DataService<BenefitsForTheHeirsOfAnEmployee> {
    constructor(http: HttpClient) {
        super('benefitsfortheheirsofanemployee', http);
    }
}

