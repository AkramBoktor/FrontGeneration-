
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FundStatistics } from 'app/shared/models/fund-statistics';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FundStatisticsService } from '../shared/fund-statistics.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-fund-statistics-view',
  templateUrl: './fund-statistics-view.component.html',
  styleUrls: ['./fund-statistics-view.component.scss'],
  providers: []
})

export class FundStatisticsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFundStatistics: FundStatistics;
  fundStatisticsForm: FormGroup;

  private collectionTypesService: LookupService;

  
collectionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFundStatisticsDialog: any,
    @Optional() public dialogRef: MatDialogRef<FundStatisticsViewComponent>,
    public fundStatisticsService: FundStatisticsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundStatistics = this.selectedFundStatisticsDialog.data || this.selectedFundStatistics;

    
	this.collectionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.collectionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع التحصيل',
	});


    this.fundStatisticsForm = this.formBuilder.group({
      
  collectionNumber : [this.selectedFundStatistics.collectionNumber],
  collectionDate : [this.selectedFundStatistics.collectionDate],
  employeeCode : [this.selectedFundStatistics.employeeCode],
  from : [this.selectedFundStatistics.from],
  to : [this.selectedFundStatistics.to],
  amount : [this.selectedFundStatistics.amount],
  collectionType : [this.selectedFundStatistics.collectionType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.fundStatisticsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.fundStatisticsForm.controls)) {
      this.fundStatisticsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.collectionTypesService = new LookupService('collectiontypes', this.http);
  }
}

