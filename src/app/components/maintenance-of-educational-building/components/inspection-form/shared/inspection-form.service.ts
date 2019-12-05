import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { InspectionForm } from 'app/shared/models/inspection-form';

@Injectable()

export class InspectionFormService extends DataService<InspectionForm> {
    constructor(http: HttpClient) {
        super('inspectionform', http);
    }
}

