import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IntroducingHajjAndUmrahGrants } from 'app/shared/models/introducing-hajj-and-umrah-grants';

@Injectable()

export class IntroducingHajjAndUmrahGrantsService extends DataService<IntroducingHajjAndUmrahGrants> {
    constructor(http: HttpClient) {
        super('introducinghajjandumrahgrants', http);
    }
}

