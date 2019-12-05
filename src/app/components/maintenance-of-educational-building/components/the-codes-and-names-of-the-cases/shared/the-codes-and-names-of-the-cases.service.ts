import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TheCodesAndNamesOfTheCases } from 'app/shared/models/the-codes-and-names-of-the-cases';

@Injectable()

export class TheCodesAndNamesOfTheCasesService extends DataService<TheCodesAndNamesOfTheCases> {
    constructor(http: HttpClient) {
        super('thecodesandnamesofthecases', http);
    }
}

