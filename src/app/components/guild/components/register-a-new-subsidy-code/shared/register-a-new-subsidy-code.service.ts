import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RegisterANewSubsidyCode } from 'app/shared/models/register-a-new-subsidy-code';

@Injectable()

export class RegisterANewSubsidyCodeService extends DataService<RegisterANewSubsidyCode> {
    constructor(http: HttpClient) {
        super('registeranewsubsidycode', http);
    }
}

