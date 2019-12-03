import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GeneralLocationOfAnAdministrativeBuilding } from 'app/shared/models/general-location-of-an-administrative-building';

@Injectable()

export class GeneralLocationOfAnAdministrativeBuildingService extends DataService<GeneralLocationOfAnAdministrativeBuilding> {
    constructor(http: HttpClient) {
        super('generallocationofanadministrativebuilding', http);
    }
}

