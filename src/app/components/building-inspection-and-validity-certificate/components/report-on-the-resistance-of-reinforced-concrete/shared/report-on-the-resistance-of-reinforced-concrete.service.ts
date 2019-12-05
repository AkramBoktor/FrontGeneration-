import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ReportOnTheResistanceOfReinforcedConcrete } from 'app/shared/models/report-on-the-resistance-of-reinforced-concrete';

@Injectable()

export class ReportOnTheResistanceOfReinforcedConcreteService extends DataService<ReportOnTheResistanceOfReinforcedConcrete> {
    constructor(http: HttpClient) {
        super('reportontheresistanceofreinforcedconcrete', http);
    }
}

