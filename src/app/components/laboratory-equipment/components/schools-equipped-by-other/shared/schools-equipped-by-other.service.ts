import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SchoolsEquippedByOther } from 'app/shared/models/schools-equipped-by-other';

@Injectable()

export class SchoolsEquippedByOtherService extends DataService<SchoolsEquippedByOther> {
    constructor(http: HttpClient) {
        super('schoolsequippedbyother', http);
    }
}

