import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { NumberOfSchoolClassesInOperation } from 'app/shared/models/number-of-school-classes-in-operation';

@Injectable()

export class NumberOfSchoolClassesInOperationService extends DataService<NumberOfSchoolClassesInOperation> {
    constructor(http: HttpClient) {
        super('numberofschoolclassesinoperation', http);
    }
}

