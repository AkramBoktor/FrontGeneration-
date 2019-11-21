import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssigningMaintenanceElectricityProjectToElectricalEngineer } from 'app/shared/models/assigning-maintenance-electricity-project-to-electrical-engineer';

@Injectable()

export class AssigningMaintenanceElectricityProjectToElectricalEngineerService extends DataService<AssigningMaintenanceElectricityProjectToElectricalEngineer> {
    constructor(http: HttpClient) {
        super('assigningmaintenanceelectricityprojecttoelectricalengineer', http);
    }
}

