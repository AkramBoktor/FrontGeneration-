import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Extension } from 'app/shared/models/extension';

@Injectable()

export class ExtensionService extends DataService<Extension> {
    constructor(http: HttpClient) {
        super('extension', http);
    }
}

