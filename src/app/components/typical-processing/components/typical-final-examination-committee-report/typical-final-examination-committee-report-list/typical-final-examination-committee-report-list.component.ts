
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalFinalExaminationCommitteeReport } from 'app/shared/models/typical-final-examination-committee-report';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalFinalExaminationCommitteeReportEditComponent } from '../typical-final-examination-committee-report-edit/typical-final-examination-committee-report-edit.component';
import { TypicalFinalExaminationCommitteeReportNewComponent } from '../typical-final-examination-committee-report-new/typical-final-examination-committee-report-new.component';
import { TypicalFinalExaminationCommitteeReportViewComponent } from '../typical-final-examination-committee-report-view/typical-final-examination-committee-report-view.component';
import { TypicalFinalExaminationCommitteeReportService } from '../shared/typical-final-examination-committee-report.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-final-examination-committee-report-list',
  templateUrl: './typical-final-examination-committee-report-list.component.html',
  styleUrls: ['./typical-final-examination-committee-report-list.component.scss'],
  providers: []
})

export class TypicalFinalExaminationCommitteeReportListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedTypicalFinalExaminationCommitteeReport: TypicalFinalExaminationCommitteeReport;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'اسم المبني', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'رقم امر التوريد', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ امر التوريد', field: 'supplyOrderDate' }),
	new GridColumnOptions({ headerName: 'سنة الخطة الانشائية', field: 'constructionPlanYear' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'اسم القائمة', field: 'listName' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'companyName' }),
	new GridColumnOptions({ headerName: 'رقم المحلق', field: 'number' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalFinalExaminationCommitteeReportViewComponent,
    editDialogClassType: TypicalFinalExaminationCommitteeReportEditComponent,
    newDialogClassType: TypicalFinalExaminationCommitteeReportNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalFinalExaminationCommitteeReportService: TypicalFinalExaminationCommitteeReportService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalFinalExaminationCommitteeReport = new TypicalFinalExaminationCommitteeReport();

    

    this.searchForm = this.formBuilder.group({
     	buildingName : [],
	orderNumber : [],
	supplyOrderDate : []
    });

     
  }

  getTypicalFinalExaminationCommitteeReportPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalFinalExaminationCommitteeReport[]> => {
    return this.typicalFinalExaminationCommitteeReportService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalFinalExaminationCommitteeReportService.delete(param.data.id)
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

