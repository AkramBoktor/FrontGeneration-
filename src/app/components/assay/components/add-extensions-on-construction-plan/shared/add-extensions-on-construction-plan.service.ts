import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AddExtensionsOnConstructionPlan } from 'app/shared/models/add-extensions-on-construction-plan';

@Injectable()

export class AddExtensionsOnConstructionPlanService extends DataService<AddExtensionsOnConstructionPlan> {
    constructor(http: HttpClient) {
        super('addextensionsonconstructionplan', http);
    }
}

