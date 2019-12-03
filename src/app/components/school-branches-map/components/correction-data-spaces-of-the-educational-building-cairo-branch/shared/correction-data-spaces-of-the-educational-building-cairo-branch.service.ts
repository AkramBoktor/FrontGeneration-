import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranch } from 'app/shared/models/correction-data-spaces-of-the-educational-building-cairo-branch';

@Injectable()

export class CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService extends DataService<CorrectionDataSpacesOfTheEducationalBuildingCairoBranch> {
    constructor(http: HttpClient) {
        super('correctiondataspacesoftheeducationalbuildingcairobranch', http);
    }
}

