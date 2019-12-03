import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MachineData } from 'app/shared/models/machine-data';

@Injectable()

export class MachineDataService extends DataService<MachineData> {
    constructor(http: HttpClient) {
        super('machinedata', http);
    }
}

