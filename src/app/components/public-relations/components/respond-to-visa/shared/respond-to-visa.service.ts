import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RespondToVisa } from 'app/shared/models/respond-to-visa';

@Injectable()

export class RespondToVisaService extends DataService<RespondToVisa> {
    constructor(http: HttpClient) {
        super('respondtovisa', http);
    }
}

