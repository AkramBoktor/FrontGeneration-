import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IncubationProgram } from 'app/shared/models/incubation-program';

@Injectable()

export class IncubationProgramService extends DataService<IncubationProgram> {
    constructor(http: HttpClient) {
        super('incubationprogram', http);
    }
}

