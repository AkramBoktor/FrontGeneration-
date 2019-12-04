import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BuildingAssays } from 'app/shared/models/building-assays';

@Injectable()

export class BuildingAssaysService extends DataService<BuildingAssays> {
    constructor(http: HttpClient) {
        super('buildingassays', http);
    }
}

