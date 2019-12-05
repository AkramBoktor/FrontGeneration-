
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PreviewNotesData } from 'app/shared/models/preview-notes-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PreviewNotesDataEditComponent } from '../preview-notes-data-edit/preview-notes-data-edit.component';
import { PreviewNotesDataNewComponent } from '../preview-notes-data-new/preview-notes-data-new.component';
import { PreviewNotesDataViewComponent } from '../preview-notes-data-view/preview-notes-data-view.component';
import { PreviewNotesDataService } from '../shared/preview-notes-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-preview-notes-data-list',
  templateUrl: './preview-notes-data-list.component.html',
  styleUrls: ['./preview-notes-data-list.component.scss'],
  providers: []
})

export class PreviewNotesDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPreviewNotesData: PreviewNotesData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود قطعة الارض', field: 'landID' }),
	new GridColumnOptions({ headerName: 'البعد', field: 'dimension' }),
	new GridColumnOptions({ headerName: 'كود المحدد', field: 'borderCode' }),
	new GridColumnOptions({ headerName: 'داخل / خارج الموقع', field: 'insideOutsideSite' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PreviewNotesDataViewComponent,
    editDialogClassType: PreviewNotesDataEditComponent,
    newDialogClassType: PreviewNotesDataNewComponent,
  });
    constructor(
        injector: Injector,
        public previewNotesDataService: PreviewNotesDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPreviewNotesData = new PreviewNotesData();

    

    this.searchForm = this.formBuilder.group({
     	landID : []
    });

     
  }

  getPreviewNotesDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PreviewNotesData[]> => {
    return this.previewNotesDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.previewNotesDataService.delete(param.data.id)
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

