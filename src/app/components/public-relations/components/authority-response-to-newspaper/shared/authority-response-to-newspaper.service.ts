import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AuthorityResponseToNewspaper } from 'app/shared/models/authority-response-to-newspaper';

@Injectable()

export class AuthorityResponseToNewspaperService extends DataService<AuthorityResponseToNewspaper> {
    constructor(http: HttpClient) {
        super('authorityresponsetonewspaper', http);
    }
}

