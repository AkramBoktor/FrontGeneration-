import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AuthorizationExchange } from 'app/shared/models/authorization-exchange';

@Injectable()

export class AuthorizationExchangeService extends DataService<AuthorizationExchange> {
    constructor(http: HttpClient) {
        super('authorizationexchange', http);
    }
}

