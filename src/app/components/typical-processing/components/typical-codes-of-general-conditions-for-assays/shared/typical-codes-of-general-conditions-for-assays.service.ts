import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalCodesOfGeneralConditionsForAssays } from 'app/shared/models/typical-codes-of-general-conditions-for-assays';

@Injectable()

export class TypicalCodesOfGeneralConditionsForAssaysService extends DataService<TypicalCodesOfGeneralConditionsForAssays> {
    constructor(http: HttpClient) {
        super('typicalcodesofgeneralconditionsforassays', http);
    }
}

