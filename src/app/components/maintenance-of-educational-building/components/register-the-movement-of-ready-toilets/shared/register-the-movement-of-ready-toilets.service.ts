import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RegisterTheMovementOfReadyToilets } from 'app/shared/models/register-the-movement-of-ready-toilets';

@Injectable()

export class RegisterTheMovementOfReadyToiletsService extends DataService<RegisterTheMovementOfReadyToilets> {
    constructor(http: HttpClient) {
        super('registerthemovementofreadytoilets', http);
    }
}

