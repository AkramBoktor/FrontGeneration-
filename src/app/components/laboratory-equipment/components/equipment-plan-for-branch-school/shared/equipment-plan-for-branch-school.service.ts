import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EquipmentPlanForBranchSchool } from 'app/shared/models/equipment-plan-for-branch-school';

@Injectable()

export class EquipmentPlanForBranchSchoolService extends DataService<EquipmentPlanForBranchSchool> {
    constructor(http: HttpClient) {
        super('equipmentplanforbranchschool', http);
    }
}

