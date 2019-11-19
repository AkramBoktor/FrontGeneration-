import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DispensingMedicationToAPatient } from 'app/shared/models/dispensing-medication-to-a-patient';

@Injectable()

export class DispensingMedicationToAPatientService extends DataService<DispensingMedicationToAPatient> {
    constructor(http: HttpClient) {
        super('dispensingmedicationtoapatient', http);
    }
}

