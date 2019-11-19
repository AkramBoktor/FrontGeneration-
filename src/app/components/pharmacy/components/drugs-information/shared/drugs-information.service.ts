import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DrugsInformation } from 'app/shared/models/drugs-information';

@Injectable()

export class DrugsInformationService extends DataService<DrugsInformation> {
    constructor(http: HttpClient) {
        super('drugsinformation', http);
    }
}

