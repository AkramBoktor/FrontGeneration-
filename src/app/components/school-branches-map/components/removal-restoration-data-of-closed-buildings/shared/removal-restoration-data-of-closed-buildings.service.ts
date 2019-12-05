import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RemovalRestorationDataOfClosedBuildings } from 'app/shared/models/removal-restoration-data-of-closed-buildings';

@Injectable()

export class RemovalRestorationDataOfClosedBuildingsService extends DataService<RemovalRestorationDataOfClosedBuildings> {
    constructor(http: HttpClient) {
        super('removalrestorationdataofclosedbuildings', http);
    }
}

