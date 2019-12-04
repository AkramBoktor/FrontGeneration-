import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TechnicalOpinionOfConsultant } from 'app/shared/models/technical-opinion-of-consultant';

@Injectable()

export class TechnicalOpinionOfConsultantService extends DataService<TechnicalOpinionOfConsultant> {
    constructor(http: HttpClient) {
        super('technicalopinionofconsultant', http);
    }
}

