import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GeneralDataOnTheProbes } from 'app/shared/models/general-data-on-the-probes';

@Injectable()

export class GeneralDataOnTheProbesService extends DataService<GeneralDataOnTheProbes> {
    constructor(http: HttpClient) {
        super('generaldataontheprobes', http);
    }
}

