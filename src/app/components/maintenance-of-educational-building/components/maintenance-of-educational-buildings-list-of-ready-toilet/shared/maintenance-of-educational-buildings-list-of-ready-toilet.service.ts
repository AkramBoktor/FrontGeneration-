import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MaintenanceOfEducationalBuildingsListOfReadyToilet } from 'app/shared/models/maintenance-of-educational-buildings-list-of-ready-toilet';

@Injectable()

export class MaintenanceOfEducationalBuildingsListOfReadyToiletService extends DataService<MaintenanceOfEducationalBuildingsListOfReadyToilet> {
    constructor(http: HttpClient) {
        super('maintenanceofeducationalbuildingslistofreadytoilet', http);
    }
}

