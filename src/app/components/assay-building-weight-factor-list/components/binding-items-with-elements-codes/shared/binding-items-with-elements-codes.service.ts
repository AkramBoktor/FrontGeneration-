import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BindingItemsWithElementsCodes } from 'app/shared/models/binding-items-with-elements-codes';

@Injectable()

export class BindingItemsWithElementsCodesService extends DataService<BindingItemsWithElementsCodes> {
    constructor(http: HttpClient) {
        super('bindingitemswithelementscodes', http);
    }
}

