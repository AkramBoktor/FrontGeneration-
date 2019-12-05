import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TheListsRequiredToEquipAllSchools } from 'app/shared/models/the-lists-required-to-equip-all-schools';

@Injectable()

export class TheListsRequiredToEquipAllSchoolsService extends DataService<TheListsRequiredToEquipAllSchools> {
    constructor(http: HttpClient) {
        super('thelistsrequiredtoequipallschools', http);
    }
}

