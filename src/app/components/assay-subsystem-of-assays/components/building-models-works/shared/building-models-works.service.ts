import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BuildingModelsWorks } from 'app/shared/models/building-models-works';

@Injectable()

export class BuildingModelsWorksService extends DataService<BuildingModelsWorks> {
    constructor(http: HttpClient) {
        super('buildingmodelsworks', http);
    }
}

