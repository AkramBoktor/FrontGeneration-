import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RegisterANewDestinationCode } from 'app/shared/models/register-a-new-destination-code';

@Injectable()

export class RegisterANewDestinationCodeService extends DataService<RegisterANewDestinationCode> {
    constructor(http: HttpClient) {
        super('registeranewdestinationcode', http);
    }
}

