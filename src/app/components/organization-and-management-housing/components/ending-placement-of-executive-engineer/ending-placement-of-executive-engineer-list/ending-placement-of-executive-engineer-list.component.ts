
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EndingPlacementOfExecutiveEngineer } from 'app/shared/models/ending-placement-of-executive-engineer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EndingPlacementOfExecutiveEngineerEditComponent } from '../ending-placement-of-executive-engineer-edit/ending-placement-of-executive-engineer-edit.component';
import { EndingPlacementOfExecutiveEngineerNewComponent } from '../ending-placement-of-executive-engineer-new/ending-placement-of-executive-engineer-new.component';
import { EndingPlacementOfExecutiveEngineerViewComponent } from '../ending-placement-of-executive-engineer-view/ending-placement-of-executive-engineer-view.component';
import { EndingPlacementOfExecutiveEngineerService } from '../shared/ending-placement-of-executive-engineer.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-ending-placement-of-executive-engineer-list',
  templateUrl: './ending-placement-of-executive-engineer-list.component.html',
  styleUrls: ['./ending-placement-of-executive-engineer-list.component.scss'],
  providers: []
})

export class EndingPlacementOfExecutiveEngineerListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private endingSupervisionReasonsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
supervisionEndResonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('supervisionEndReson', { static: true }) SupervisionEndResonSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEndingPlacementOfExecutiveEngineer: EndingPlacementOfExecutiveEngineer;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المهندس التنفيذى ', field: 'executiveEngineerNumber' }),
	new GridColumnOptions({ headerName: 'رقم المدرسه', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'atthachEngineerNumber' }),
	new GridColumnOptions({ headerName: 'سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الاشراف', field: 'supervisionBeginningDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهايه الاشراف', field: 'supervisionEndDate' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'كود سبب انهاء الاشراف', field: 'supervisionEndReson' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EndingPlacementOfExecutiveEngineerViewComponent,
    editDialogClassType: EndingPlacementOfExecutiveEngineerEditComponent,
    newDialogClassType: EndingPlacementOfExecutiveEngineerNewComponent,
  });
    constructor(
        injector: Injector,
        public endingPlacementOfExecutiveEngineerService: EndingPlacementOfExecutiveEngineerService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEndingPlacementOfExecutiveEngineer = new EndingPlacementOfExecutiveEngineer();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.supervisionEndResonSelectOptions = new MaterialSelectOptions({
	 data: this.endingSupervisionReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود سبب انهاء الاشراف',
	});


    this.searchForm = this.formBuilder.group({
     	executiveEngineerNumber : [],
	schoolNumber : [],
	atthachEngineerNumber : [],
	yearPlan : [],
	bidNumber : [],
	supervisionBeginningDate : [],
	supervisionEndDate : [],
	branchCode : [],
	supervisionEndReson : []
    });

     
  }

  getEndingPlacementOfExecutiveEngineerPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EndingPlacementOfExecutiveEngineer[]> => {
    return this.endingPlacementOfExecutiveEngineerService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.endingPlacementOfExecutiveEngineerService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.endingSupervisionReasonsService = new LookupService('endingsupervisionreasons', this.http);
  }
}

