import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AbstractStatementMaintenance } from 'app/shared/models/abstract-statement-maintenance';

@Injectable()

export class AbstractStatementMaintenanceService extends DataService<AbstractStatementMaintenance> {
    constructor(http: HttpClient) {
        super('abstractstatementmaintenance', http);
    }
}

