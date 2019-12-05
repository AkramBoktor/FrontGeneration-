import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { OfficesFromThePostOffice } from 'app/shared/models/offices-from-the-post-office';

@Injectable()

export class OfficesFromThePostOfficeService extends DataService<OfficesFromThePostOffice> {
    constructor(http: HttpClient) {
        super('officesfromthepostoffice', http);
    }
}

