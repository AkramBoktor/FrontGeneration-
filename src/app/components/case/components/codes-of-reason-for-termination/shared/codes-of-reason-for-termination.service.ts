import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CodesOfReasonForTermination } from 'app/shared/models/codes-of-reason-for-termination';

@Injectable()

export class CodesOfReasonForTerminationService extends DataService<CodesOfReasonForTermination> {
    constructor(http: HttpClient) {
        super('codesofreasonfortermination', http);
    }
}

