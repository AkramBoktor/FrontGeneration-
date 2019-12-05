
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ThePositionsOfLandAvailable } from 'app/shared/models/the-positions-of-land-available';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ThePositionsOfLandAvailableEditComponent } from '../the-positions-of-land-available-edit/the-positions-of-land-available-edit.component';
import { ThePositionsOfLandAvailableNewComponent } from '../the-positions-of-land-available-new/the-positions-of-land-available-new.component';
import { ThePositionsOfLandAvailableViewComponent } from '../the-positions-of-land-available-view/the-positions-of-land-available-view.component';
import { ThePositionsOfLandAvailableService } from '../shared/the-positions-of-land-available.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-positions-of-land-available-list',
  templateUrl: './the-positions-of-land-available-list.component.html',
  styleUrls: ['./the-positions-of-land-available-list.component.scss'],
  providers: []
})

export class ThePositionsOfLandAvailableListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private documentCodesService: LookupService;

  
documentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('documentCode', { static: true }) DocumentCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedThePositionsOfLandAvailable: ThePositionsOfLandAvailable;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المشروع', field: 'projectCode' }),
	new GridColumnOptions({ headerName: 'كود المستند', field: 'documentCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ThePositionsOfLandAvailableViewComponent,
    editDialogClassType: ThePositionsOfLandAvailableEditComponent,
    newDialogClassType: ThePositionsOfLandAvailableNewComponent,
  });
    constructor(
        injector: Injector,
        public thePositionsOfLandAvailableService: ThePositionsOfLandAvailableService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedThePositionsOfLandAvailable = new ThePositionsOfLandAvailable();

    
	this.documentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستند',
	});


    this.searchForm = this.formBuilder.group({
     	projectCode : [],
	documentCode : []
    });

     
  }

  getThePositionsOfLandAvailablePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ThePositionsOfLandAvailable[]> => {
    return this.thePositionsOfLandAvailableService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.thePositionsOfLandAvailableService.delete(param.data.id)
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

