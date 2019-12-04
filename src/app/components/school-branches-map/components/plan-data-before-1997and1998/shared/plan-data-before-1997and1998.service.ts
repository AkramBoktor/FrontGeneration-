import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PlanDataBefore1997and1998 } from 'app/shared/models/plan-data-before-1997and1998';

@Injectable()

export class PlanDataBefore1997and1998Service extends DataService<PlanDataBefore1997and1998> {
    constructor(http: HttpClient) {
        super('plandatabefore1997and1998', http);
    }
}

