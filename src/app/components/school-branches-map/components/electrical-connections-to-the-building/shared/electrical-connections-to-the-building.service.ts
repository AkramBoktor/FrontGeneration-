import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ElectricalConnectionsToTheBuilding } from 'app/shared/models/electrical-connections-to-the-building';

@Injectable()

export class ElectricalConnectionsToTheBuildingService extends DataService<ElectricalConnectionsToTheBuilding> {
    constructor(http: HttpClient) {
        super('electricalconnectionstothebuilding', http);
    }
}

