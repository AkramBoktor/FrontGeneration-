import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { OldPlansBefore97 } from 'app/shared/models/old-plans-before-97';

@Injectable()

export class OldPlansBefore97Service extends DataService<OldPlansBefore97> {
    constructor(http: HttpClient) {
        super('oldplansbefore97', http);
    }
}

