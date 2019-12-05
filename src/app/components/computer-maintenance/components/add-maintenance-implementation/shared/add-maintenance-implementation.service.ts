import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AddMaintenanceImplementation } from 'app/shared/models/add-maintenance-implementation';

@Injectable()

export class AddMaintenanceImplementationService extends DataService<AddMaintenanceImplementation> {
    constructor(http: HttpClient) {
        super('addmaintenanceimplementation', http);
    }
}

