import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BaseType } from 'app/shared/models/base-type';

@Injectable()

export class BaseTypeService extends DataService<BaseType> {
    constructor(http: HttpClient) {
        super('basetype', http);
    }
}

