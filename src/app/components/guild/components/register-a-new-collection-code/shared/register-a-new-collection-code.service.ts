import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RegisterANewCollectionCode } from 'app/shared/models/register-a-new-collection-code';

@Injectable()

export class RegisterANewCollectionCodeService extends DataService<RegisterANewCollectionCode> {
    constructor(http: HttpClient) {
        super('registeranewcollectioncode', http);
    }
}

