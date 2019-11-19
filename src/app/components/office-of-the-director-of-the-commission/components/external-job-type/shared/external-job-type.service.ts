import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExternalJobType } from 'app/shared/models/external-job-type';

@Injectable()

export class ExternalJobTypeService extends DataService<ExternalJobType> {
    constructor(http: HttpClient) {
        super('externaljobtype', http);
    }
}

