
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Recruitment } from 'app/shared/models/recruitment';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RecruitmentEditComponent } from '../recruitment-edit/recruitment-edit.component';
import { RecruitmentNewComponent } from '../recruitment-new/recruitment-new.component';
import { RecruitmentViewComponent } from '../recruitment-view/recruitment-view.component';
import { RecruitmentService } from '../shared/recruitment.service';

@Component({
  selector: 'app-recruitment-list',
  templateUrl: './recruitment-list.component.html',
  styleUrls: ['./recruitment-list.component.scss'],
  providers: []
})

export class RecruitmentListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private positionRecruitmentsService: LookupService;

  
positionRecruitmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('positionRecruitment', { static: true }) PositionRecruitmentSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecruitment: Recruitment;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ تحرير شهاده الخدمه', field: 'serviceCertificateDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهايه الاعفاء الموقت', field: 'temporaryExemptionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الاستدعاء للاحتياط', field: 'callbackReserveDate' }),
	new GridColumnOptions({ headerName: 'تاريخ العوده من الاحتياط', field: 'reserveReturnDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهايه الاحتياط', field: 'reserveEndDate' }),
	new GridColumnOptions({ headerName: 'تاريخ دخول الجيش', field: 'entryArmyDate' }),
	new GridColumnOptions({ headerName: 'تاريخ خروج من الجيش', field: 'departureArmyDate' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'موقف التجنيد', field: 'positionRecruitment' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecruitmentViewComponent,
    editDialogClassType: RecruitmentEditComponent,
    newDialogClassType: RecruitmentNewComponent,
  });
    constructor(
        injector: Injector,
        public recruitmentService: RecruitmentService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecruitment = new Recruitment();

    
	this.positionRecruitmentSelectOptions = new MaterialSelectOptions({
	 data: this.positionRecruitmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف التجنيد',
	});


    this.searchForm = this.formBuilder.group({
     	temporaryExemptionDate : [],
	entryArmyDate : [],
	departureArmyDate : [],
	employeeCode : [],
	positionRecruitment : []
    });

     
  }

  getRecruitmentPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Recruitment[]> => {
    return this.recruitmentService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recruitmentService.delete(param.data.id)
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
    this.positionRecruitmentsService = new LookupService('positionrecruitments', this.http);
  }
}

