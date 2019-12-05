import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BusinessAssayForOthers } from 'app/shared/models/business-assay-for-others';

@Injectable()

export class BusinessAssayForOthersService extends DataService<BusinessAssayForOthers> {
    constructor(http: HttpClient) {
        super('businessassayforothers', http);
    }
}

