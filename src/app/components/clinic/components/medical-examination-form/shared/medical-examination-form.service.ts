import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MedicalExaminationForm } from 'app/shared/models/medical-examination-form';

@Injectable()

export class MedicalExaminationFormService extends DataService<MedicalExaminationForm> {
    constructor(http: HttpClient) {
        super('medicalexaminationform', http);
    }
}

