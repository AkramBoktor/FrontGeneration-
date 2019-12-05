
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AvailableLandPosition } from 'app/shared/models/available-land-position';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AvailableLandPositionEditComponent } from '../available-land-position-edit/available-land-position-edit.component';
import { AvailableLandPositionNewComponent } from '../available-land-position-new/available-land-position-new.component';
import { AvailableLandPositionViewComponent } from '../available-land-position-view/available-land-position-view.component';
import { AvailableLandPositionService } from '../shared/available-land-position.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-available-land-position-list',
  templateUrl: './available-land-position-list.component.html',
  styleUrls: ['./available-land-position-list.component.scss'],
  providers: []
})

export class AvailableLandPositionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private documentCodesService: LookupService;

  
documentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('document', { static: true }) DocumentSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAvailableLandPosition: AvailableLandPosition;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المشروع', field: 'projectCode' }),
	new GridColumnOptions({ headerName: 'المستند', field: 'document' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AvailableLandPositionViewComponent,
    editDialogClassType: AvailableLandPositionEditComponent,
    newDialogClassType: AvailableLandPositionNewComponent,
  });
    constructor(
        injector: Injector,
        public availableLandPositionService: AvailableLandPositionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAvailableLandPosition = new AvailableLandPosition();

    
	this.documentSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المستند',
	});


    this.searchForm = this.formBuilder.group({
     	projectCode : [],
	document : []
    });

     
  }

  getAvailableLandPositionPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AvailableLandPosition[]> => {
    return this.availableLandPositionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.availableLandPositionService.delete(param.data.id)
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
    this.documentCodesService = new LookupService('documentcodes', this.http);
  }
}

