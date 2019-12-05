import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataToTakeSpecialLeaveForEmployeeG } from 'app/shared/models/data-to-take-special-leave-for-employee-g';

@Injectable()

export class DataToTakeSpecialLeaveForEmployeeGService extends DataService<DataToTakeSpecialLeaveForEmployeeG> {
    constructor(http: HttpClient) {
        super('datatotakespecialleaveforemployeeg', http);
    }
}

