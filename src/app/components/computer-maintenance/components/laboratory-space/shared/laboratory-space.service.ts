import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LaboratorySpace } from 'app/shared/models/laboratory-space';

@Injectable()

export class LaboratorySpaceService extends DataService<LaboratorySpace> {
    constructor(http: HttpClient) {
        super('laboratoryspace', http);
    }
}

