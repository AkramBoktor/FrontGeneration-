import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { NoteSeenByTheChemistryLaboratory } from 'app/shared/models/note-seen-by-the-chemistry-laboratory';

@Injectable()

export class NoteSeenByTheChemistryLaboratoryService extends DataService<NoteSeenByTheChemistryLaboratory> {
    constructor(http: HttpClient) {
        super('noteseenbythechemistrylaboratory', http);
    }
}

