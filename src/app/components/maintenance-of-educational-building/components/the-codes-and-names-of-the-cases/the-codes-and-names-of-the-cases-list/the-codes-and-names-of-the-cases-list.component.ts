
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TheCodesAndNamesOfTheCases } from 'app/shared/models/the-codes-and-names-of-the-cases';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheCodesAndNamesOfTheCasesEditComponent } from '../the-codes-and-names-of-the-cases-edit/the-codes-and-names-of-the-cases-edit.component';
import { TheCodesAndNamesOfTheCasesNewComponent } from '../the-codes-and-names-of-the-cases-new/the-codes-and-names-of-the-cases-new.component';
import { TheCodesAndNamesOfTheCasesViewComponent } from '../the-codes-and-names-of-the-cases-view/the-codes-and-names-of-the-cases-view.component';
import { TheCodesAndNamesOfTheCasesService } from '../shared/the-codes-and-names-of-the-cases.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-codes-and-names-of-the-cases-list',
  templateUrl: './the-codes-and-names-of-the-cases-list.component.html',
  styleUrls: ['./the-codes-and-names-of-the-cases-list.component.scss'],
  providers: []
})

export class TheCodesAndNamesOfTheCasesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private statusCodesService: LookupService;

  
statusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('statusCode', { static: true }) StatusCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTheCodesAndNamesOfTheCases: TheCodesAndNamesOfTheCases;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' اسم الحاله', field: 'statusName' }),
	new GridColumnOptions({ headerName: ' كود الحاله ', field: 'statusCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TheCodesAndNamesOfTheCasesViewComponent,
    editDialogClassType: TheCodesAndNamesOfTheCasesEditComponent,
    newDialogClassType: TheCodesAndNamesOfTheCasesNewComponent,
  });
    constructor(
        injector: Injector,
        public theCodesAndNamesOfTheCasesService: TheCodesAndNamesOfTheCasesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTheCodesAndNamesOfTheCases = new TheCodesAndNamesOfTheCases();

    
	this.statusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الحاله ',
	});


    this.searchForm = this.formBuilder.group({
     	statusName : [],
	statusCode : []
    });

     
  }

  getTheCodesAndNamesOfTheCasesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TheCodesAndNamesOfTheCases[]> => {
    return this.theCodesAndNamesOfTheCasesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.theCodesAndNamesOfTheCasesService.delete(param.data.id)
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
    this.statusCodesService = new LookupService('statuscodes', this.http);
  }
}

