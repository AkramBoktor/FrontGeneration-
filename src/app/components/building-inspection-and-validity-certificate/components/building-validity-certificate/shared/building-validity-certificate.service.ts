import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BuildingValidityCertificate } from 'app/shared/models/building-validity-certificate';

@Injectable()

export class BuildingValidityCertificateService extends DataService<BuildingValidityCertificate> {
    constructor(http: HttpClient) {
        super('buildingvaliditycertificate', http);
    }
}

