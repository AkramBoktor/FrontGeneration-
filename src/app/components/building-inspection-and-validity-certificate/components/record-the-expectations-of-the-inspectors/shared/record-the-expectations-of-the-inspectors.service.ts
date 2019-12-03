import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordTheExpectationsOfTheInspectors } from 'app/shared/models/record-the-expectations-of-the-inspectors';

@Injectable()

export class RecordTheExpectationsOfTheInspectorsService extends DataService<RecordTheExpectationsOfTheInspectors> {
    constructor(http: HttpClient) {
        super('recordtheexpectationsoftheinspectors', http);
    }
}

