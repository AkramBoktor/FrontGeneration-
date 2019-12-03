import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataSpacesOfTheEducationalBuilding } from 'app/shared/models/data-spaces-of-the-educational-building';

@Injectable()

export class DataSpacesOfTheEducationalBuildingService extends DataService<DataSpacesOfTheEducationalBuilding> {
    constructor(http: HttpClient) {
        super('dataspacesoftheeducationalbuilding', http);
    }
}

