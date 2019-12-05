
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FundStatistics } from 'app/shared/models/fund-statistics';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FundStatisticsService } from '../shared/fund-statistics.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-fund-statistics-edit',
  templateUrl: './fund-statistics-edit.component.html',
  styleUrls: ['./fund-statistics-edit.component.scss'],
  providers: []
})

export class FundStatisticsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFundStatistics: FundStatistics;
  fundStatisticsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private collectionTypesService: LookupService;

  
collectionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('collectionType', { static: true }) CollectionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFundStatisticsDialog: any,
    @Optional() public dialogRef: MatDialogRef<FundStatisticsEditComponent>,
    public fundStatisticsService: FundStatisticsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundStatistics = new FundStatistics();
    this.selectedFundStatistics = this.selectedFundStatisticsDialog.data || this.selectedFundStatistics;

    
	this.collectionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.collectionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع التحصيل',
	});


    this.fundStatisticsForm = this.formBuilder.group({
      
  id : [this.selectedFundStatistics.id],
  collectionNumber : [this.selectedFundStatistics.collectionNumber, [ Validators.required ]],
  collectionDate : [this.selectedFundStatistics.collectionDate, [ Validators.required ]],
  employeeCode : [this.selectedFundStatistics.employeeCode, [ Validators.required ]],
  from : [this.selectedFundStatistics.from, [ Validators.required ]],
  to : [this.selectedFundStatistics.to, [ Validators.required ]],
  amount : [this.selectedFundStatistics.amount, [ Validators.required ]],
  collectionType : [this.selectedFundStatistics.collectionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.fundStatisticsService.update(this.fundStatisticsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.fundStatisticsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.fundStatisticsForm.get(name);
  }

  initializeLookupServices() {
    this.collectionTypesService = new LookupService('collectiontypes', this.http);
  }
}
