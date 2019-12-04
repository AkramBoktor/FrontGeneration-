import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssayOfWithdrawnWorks } from 'app/shared/models/assay-of-withdrawn-works';

@Injectable()

export class AssayOfWithdrawnWorksService extends DataService<AssayOfWithdrawnWorks> {
    constructor(http: HttpClient) {
        super('assayofwithdrawnworks', http);
    }
}

