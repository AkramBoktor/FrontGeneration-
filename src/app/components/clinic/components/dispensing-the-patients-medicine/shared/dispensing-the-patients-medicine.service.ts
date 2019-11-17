import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DispensingThePatientsMedicine } from 'app/shared/models/dispensing-the-patients-medicine';

@Injectable()

export class DispensingThePatientsMedicineService extends DataService<DispensingThePatientsMedicine> {
    constructor(http: HttpClient) {
        super('dispensingthepatientsmedicine', http);
    }
}

