import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IdentificationDataForAnAdministrativeBuilding } from 'app/shared/models/identification-data-for-an-administrative-building';

@Injectable()

export class IdentificationDataForAnAdministrativeBuildingService extends DataService<IdentificationDataForAnAdministrativeBuilding> {
    constructor(http: HttpClient) {
        super('identificationdataforanadministrativebuilding', http);
    }
}

