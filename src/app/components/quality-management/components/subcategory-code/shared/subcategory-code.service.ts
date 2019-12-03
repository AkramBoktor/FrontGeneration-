import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubcategoryCode } from 'app/shared/models/subcategory-code';

@Injectable()

export class SubcategoryCodeService extends DataService<SubcategoryCode> {
    constructor(http: HttpClient) {
        super('subcategorycode', http);
    }
}

