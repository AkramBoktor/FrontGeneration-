import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordingCorrectionsForEmployees } from 'app/shared/models/recording-corrections-for-employees';

@Injectable()

export class RecordingCorrectionsForEmployeesService extends DataService<RecordingCorrectionsForEmployees> {
    constructor(http: HttpClient) {
        super('recordingcorrectionsforemployees', http);
    }
}

