import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssayModel } from 'app/shared/models/assay-model';

@Injectable()

export class AssayModelService extends DataService<AssayModel> {
    constructor(http: HttpClient) {
        super('assaymodel', http);
    }
}

