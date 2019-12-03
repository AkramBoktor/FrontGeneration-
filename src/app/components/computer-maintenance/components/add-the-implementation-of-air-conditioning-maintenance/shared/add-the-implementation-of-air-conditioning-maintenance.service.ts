import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AddTheImplementationOfAirConditioningMaintenance } from 'app/shared/models/add-the-implementation-of-air-conditioning-maintenance';

@Injectable()

export class AddTheImplementationOfAirConditioningMaintenanceService extends DataService<AddTheImplementationOfAirConditioningMaintenance> {
    constructor(http: HttpClient) {
        super('addtheimplementationofairconditioningmaintenance', http);
    }
}

