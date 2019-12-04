import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GasAppliancesData } from 'app/shared/models/gas-appliances-data';

@Injectable()

export class GasAppliancesDataService extends DataService<GasAppliancesData> {
    constructor(http: HttpClient) {
        super('gasappliancesdata', http);
    }
}

