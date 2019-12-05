
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Reward } from 'app/shared/models/reward';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RewardEditComponent } from '../reward-edit/reward-edit.component';
import { RewardNewComponent } from '../reward-new/reward-new.component';
import { RewardViewComponent } from '../reward-view/reward-view.component';
import { RewardService } from '../shared/reward.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-reward-list',
  templateUrl: './reward-list.component.html',
  styleUrls: ['./reward-list.component.scss'],
  providers: []
})

export class RewardListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private departmentsSectionsService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedReward: Reward;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المكافاه', field: 'bonusCode' }),
	new GridColumnOptions({ headerName: 'رقم الوارد', field: 'incomingNumber' }),
	new GridColumnOptions({ headerName: 'شهر وسنه الوارد', field: 'incomingYearAndMonth' }),
	new GridColumnOptions({ headerName: 'صافي القيمه', field: 'netValue' }),
	new GridColumnOptions({ headerName: 'رقم الشطب', field: 'writeOffNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الفعليه', field: 'atualDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الافراج', field: 'releaseDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الشطب', field: 'delistingDate' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RewardViewComponent,
    editDialogClassType: RewardEditComponent,
    newDialogClassType: RewardNewComponent,
  });
    constructor(
        injector: Injector,
        public rewardService: RewardService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedReward = new Reward();

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.searchForm = this.formBuilder.group({
     	bonusCode : [],
	incomingNumber : [],
	incomingYearAndMonth : [],
	netValue : [],
	writeOffNumber : [],
	atualDate : [],
	releaseDate : [],
	delistingDate : [],
	administrationCode : []
    });

     
  }

  getRewardsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Reward[]> => {
    return this.rewardService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.rewardService.delete(param.data.id)
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
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

