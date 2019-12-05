import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordingEmployeeDebtValues } from 'app/shared/models/recording-employee-debt-values';

@Injectable()

export class RecordingEmployeeDebtValuesService extends DataService<RecordingEmployeeDebtValues> {
    constructor(http: HttpClient) {
        super('recordingemployeedebtvalues', http);
    }
}

