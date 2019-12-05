import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordThePositionOfTheInternship } from 'app/shared/models/record-the-position-of-the-internship';

@Injectable()

export class RecordThePositionOfTheInternshipService extends DataService<RecordThePositionOfTheInternship> {
    constructor(http: HttpClient) {
        super('recordthepositionoftheinternship', http);
    }
}

