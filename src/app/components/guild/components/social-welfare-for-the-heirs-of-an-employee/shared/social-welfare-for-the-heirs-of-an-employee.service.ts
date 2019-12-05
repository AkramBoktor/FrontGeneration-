import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SocialWelfareForTheHeirsOfAnEmployee } from 'app/shared/models/social-welfare-for-the-heirs-of-an-employee';

@Injectable()

export class SocialWelfareForTheHeirsOfAnEmployeeService extends DataService<SocialWelfareForTheHeirsOfAnEmployee> {
    constructor(http: HttpClient) {
        super('socialwelfarefortheheirsofanemployee', http);
    }
}

