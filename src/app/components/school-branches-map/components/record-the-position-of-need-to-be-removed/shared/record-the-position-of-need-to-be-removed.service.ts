import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordThePositionOfNeedToBeRemoved } from 'app/shared/models/record-the-position-of-need-to-be-removed';

@Injectable()

export class RecordThePositionOfNeedToBeRemovedService extends DataService<RecordThePositionOfNeedToBeRemoved> {
    constructor(http: HttpClient) {
        super('recordthepositionofneedtoberemoved', http);
    }
}

