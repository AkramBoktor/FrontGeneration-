
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { NoteSeenByTheChemistryLaboratory } from 'app/shared/models/note-seen-by-the-chemistry-laboratory';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NoteSeenByTheChemistryLaboratoryEditComponent } from '../note-seen-by-the-chemistry-laboratory-edit/note-seen-by-the-chemistry-laboratory-edit.component';
import { NoteSeenByTheChemistryLaboratoryNewComponent } from '../note-seen-by-the-chemistry-laboratory-new/note-seen-by-the-chemistry-laboratory-new.component';
import { NoteSeenByTheChemistryLaboratoryViewComponent } from '../note-seen-by-the-chemistry-laboratory-view/note-seen-by-the-chemistry-laboratory-view.component';
import { NoteSeenByTheChemistryLaboratoryService } from '../shared/note-seen-by-the-chemistry-laboratory.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-note-seen-by-the-chemistry-laboratory-list',
  templateUrl: './note-seen-by-the-chemistry-laboratory-list.component.html',
  styleUrls: ['./note-seen-by-the-chemistry-laboratory-list.component.scss'],
  providers: []
})

export class NoteSeenByTheChemistryLaboratoryListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedNoteSeenByTheChemistryLaboratory: NoteSeenByTheChemistryLaboratory;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الباركود', field: 'barcodeNumber' }),
	new GridColumnOptions({ headerName: ' الملاحظات', field: 'notes' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: NoteSeenByTheChemistryLaboratoryViewComponent,
    editDialogClassType: NoteSeenByTheChemistryLaboratoryEditComponent,
    newDialogClassType: NoteSeenByTheChemistryLaboratoryNewComponent,
  });
    constructor(
        injector: Injector,
        public noteSeenByTheChemistryLaboratoryService: NoteSeenByTheChemistryLaboratoryService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedNoteSeenByTheChemistryLaboratory = new NoteSeenByTheChemistryLaboratory();

    

    this.searchForm = this.formBuilder.group({
     	barcodeNumber : []
    });

     
  }

  getNotesSeenByTheChemistryLaboratoryPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<NoteSeenByTheChemistryLaboratory[]> => {
    return this.noteSeenByTheChemistryLaboratoryService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.noteSeenByTheChemistryLaboratoryService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

