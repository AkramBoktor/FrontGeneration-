import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MachineLinkedToTheLaboratory } from 'app/shared/models/machine-linked-to-the-laboratory';

@Injectable()

export class MachineLinkedToTheLaboratoryService extends DataService<MachineLinkedToTheLaboratory> {
    constructor(http: HttpClient) {
        super('machinelinkedtothelaboratory', http);
    }
}

