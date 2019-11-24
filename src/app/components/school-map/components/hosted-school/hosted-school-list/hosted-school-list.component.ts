
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { HostedSchool } from 'app/shared/models/hosted-school';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { HostedSchoolEditComponent } from '../hosted-school-edit/hosted-school-edit.component';
import { HostedSchoolNewComponent } from '../hosted-school-new/hosted-school-new.component';
import { HostedSchoolViewComponent } from '../hosted-school-view/hosted-school-view.component';
import { HostedSchoolService } from '../shared/hosted-school.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-hosted-school-list',
  templateUrl: './hosted-school-list.component.html',
  styleUrls: ['./hosted-school-list.component.scss'],
  providers: []
})

export class HostedSchoolListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private hostingReasonsService: LookupService;

  
hostingReasonsSelectOptions: MaterialSelectOptions;

  
	@ViewChild('hostingReasons', { static: true }) HostingReasonsSelectComponent: MaterialSelectComponent;

  
  @Input() selectedHostedSchool: HostedSchool;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدرسة المستضيفة', field: 'hostSchoolNumber' }),
	new GridColumnOptions({ headerName: 'مدة الاستضافه من ', field: 'hostingDurationFrom' }),
	new GridColumnOptions({ headerName: 'المدة الي', field: 'durationTo' }),
	new GridColumnOptions({ headerName: 'رقم المدرسة المستضافة', field: 'hostedSchoolNumber' }),
	new GridColumnOptions({ headerName: 'عدد تلاميذ المستضافة', field: 'pupilsNumber' }),
	new GridColumnOptions({ headerName: 'عدد الفراغات المستخدمة', field: 'spacesUsedNumber' }),
	new GridColumnOptions({ headerName: 'أسباب الاستضافة', field: 'hostingReasons' }),
	new GridColumnOptions({ headerName: 'مرحلة المدرسه المستضافه', field: 'hostedSchoolStage' }),
	new GridColumnOptions({ headerName: 'نوع تلاميذ المستضيفه', field: 'pupilsType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: HostedSchoolViewComponent,
    editDialogClassType: HostedSchoolEditComponent,
    newDialogClassType: HostedSchoolNewComponent,
  });
    constructor(
        injector: Injector,
        public hostedSchoolService: HostedSchoolService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedHostedSchool = new HostedSchool();

    
	this.hostingReasonsSelectOptions = new MaterialSelectOptions({
	 data: this.hostingReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'أسباب الاستضافة',
	});


    this.searchForm = this.formBuilder.group({
     	hostSchoolNumber : [],
	hostingDurationFrom : [],
	durationTo : [],
	hostedSchoolNumber : [],
	hostingReasons : []
    });

     
  }

  getHostedSchoolsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<HostedSchool[]> => {
    return this.hostedSchoolService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.hostedSchoolService.delete(param.data.id)
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
    this.hostingReasonsService = new LookupService('hostingreasons', this.http);
  }
}

