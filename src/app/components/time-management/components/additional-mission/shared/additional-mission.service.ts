import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AdditionalMission } from 'app/shared/models/additional-mission';

@Injectable()

export class AdditionalMissionService extends DataService<AdditionalMission> {
    constructor(http: HttpClient) {
        super('additionalmission', http);
    }
}

