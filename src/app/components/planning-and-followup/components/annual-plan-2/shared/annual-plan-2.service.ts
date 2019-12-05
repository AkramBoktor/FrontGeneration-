import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AnnualPlan2 } from 'app/shared/models/annual-plan-2';

@Injectable()

export class AnnualPlan2Service extends DataService<AnnualPlan2> {
    constructor(http: HttpClient) {
        super('annualplan2', http);
    }
}

