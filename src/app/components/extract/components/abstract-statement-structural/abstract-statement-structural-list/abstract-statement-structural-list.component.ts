
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AbstractStatementStructural } from 'app/shared/models/abstract-statement-structural';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AbstractStatementStructuralEditComponent } from '../abstract-statement-structural-edit/abstract-statement-structural-edit.component';
import { AbstractStatementStructuralNewComponent } from '../abstract-statement-structural-new/abstract-statement-structural-new.component';
import { AbstractStatementStructuralViewComponent } from '../abstract-statement-structural-view/abstract-statement-structural-view.component';
import { AbstractStatementStructuralService } from '../shared/abstract-statement-structural.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-abstract-statement-structural-list',
  templateUrl: './abstract-statement-structural-list.component.html',
  styleUrls: ['./abstract-statement-structural-list.component.scss'],
  providers: []
})

export class AbstractStatementStructuralListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private extractTypesService: LookupService;

  
abstractTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('abstractType', { static: true }) AbstractTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAbstractStatementStructural: AbstractStatementStructural;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية بالعقد', field: 'contractQuantity' }),
	new GridColumnOptions({ headerName: 'الكمية الاجمالية', field: 'totalQuantity' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AbstractStatementStructuralViewComponent,
    editDialogClassType: AbstractStatementStructuralEditComponent,
    newDialogClassType: AbstractStatementStructuralNewComponent,
  });
    constructor(
        injector: Injector,
        public abstractStatementStructuralService: AbstractStatementStructuralService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAbstractStatementStructural = new AbstractStatementStructural();

    
	this.abstractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	abstractNumber : [],
	planYear : [],
	abstractType : []
    });

     
  }

  getAbstractStatementStructuralPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AbstractStatementStructural[]> => {
    return this.abstractStatementStructuralService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.abstractStatementStructuralService.delete(param.data.id)
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
    this.extractTypesService = new LookupService('extracttypes', this.http);
  }
}

