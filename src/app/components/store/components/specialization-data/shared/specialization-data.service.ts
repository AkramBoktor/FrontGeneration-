import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SpecializationData } from 'app/shared/models/specialization-data';

@Injectable()

export class SpecializationDataService extends DataService<SpecializationData> {
    constructor(http: HttpClient) {
        super('specializationdata', http);
    }
}

