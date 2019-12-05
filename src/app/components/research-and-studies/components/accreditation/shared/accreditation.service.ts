import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Accreditation } from 'app/shared/models/accreditation';

@Injectable()

export class AccreditationService extends DataService<Accreditation> {
    constructor(http: HttpClient) {
        super('accreditation', http);
    }
}

