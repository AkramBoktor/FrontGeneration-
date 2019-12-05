import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DrainageDataForTheBuilding } from 'app/shared/models/drainage-data-for-the-building';

@Injectable()

export class DrainageDataForTheBuildingService extends DataService<DrainageDataForTheBuilding> {
    constructor(http: HttpClient) {
        super('drainagedataforthebuilding', http);
    }
}

