import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MachineRelatedTest } from 'app/shared/models/machine-related-test';

@Injectable()

export class MachineRelatedTestService extends DataService<MachineRelatedTest> {
    constructor(http: HttpClient) {
        super('machinerelatedtest', http);
    }
}

