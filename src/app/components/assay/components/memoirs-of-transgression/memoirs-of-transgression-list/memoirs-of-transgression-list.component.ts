
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MemoirsOfTransgression } from 'app/shared/models/memoirs-of-transgression';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MemoirsOfTransgressionEditComponent } from '../memoirs-of-transgression-edit/memoirs-of-transgression-edit.component';
import { MemoirsOfTransgressionNewComponent } from '../memoirs-of-transgression-new/memoirs-of-transgression-new.component';
import { MemoirsOfTransgressionViewComponent } from '../memoirs-of-transgression-view/memoirs-of-transgression-view.component';
import { MemoirsOfTransgressionService } from '../shared/memoirs-of-transgression.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-memoirs-of-transgression-list',
  templateUrl: './memoirs-of-transgression-list.component.html',
  styleUrls: ['./memoirs-of-transgression-list.component.scss'],
  providers: []
})

export class MemoirsOfTransgressionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private branchCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMemoirsOfTransgression: MemoirsOfTransgression;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة ', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'رقم المذكره', field: 'noteNumber' }),
	new GridColumnOptions({ headerName: 'الملحق', field: 'attachment' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'كمية التجاوز', field: 'overtakingAmount' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MemoirsOfTransgressionViewComponent,
    editDialogClassType: MemoirsOfTransgressionEditComponent,
    newDialogClassType: MemoirsOfTransgressionNewComponent,
  });
    constructor(
        injector: Injector,
        public memoirsOfTransgressionService: MemoirsOfTransgressionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMemoirsOfTransgression = new MemoirsOfTransgression();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	constructionType : [],
	branch : []
    });

     
  }

  getMemoirsOfTransgressionPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MemoirsOfTransgression[]> => {
    return this.memoirsOfTransgressionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.memoirsOfTransgressionService.delete(param.data.id)
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
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

