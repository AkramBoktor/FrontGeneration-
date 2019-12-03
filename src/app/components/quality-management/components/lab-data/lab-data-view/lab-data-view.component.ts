
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LabData } from 'app/shared/models/lab-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LabDataService } from '../shared/lab-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-lab-data-view',
  templateUrl: './lab-data-view.component.html',
  styleUrls: ['./lab-data-view.component.scss'],
  providers: []
})

export class LabDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLabData: LabData;
  labDataForm: FormGroup;

  private branchCodesService: LookupService;
private yesOrNoService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
existingSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLabDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<LabDataViewComponent>,
    public labDataService: LabDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLabData = this.selectedLabDataDialog.data || this.selectedLabData;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.existingSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNoService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موجود ',
	});


    this.labDataForm = this.formBuilder.group({
      
  laboratoryCode : [this.selectedLabData.laboratoryCode],
  laboratoryAddress : [this.selectedLabData.laboratoryAddress],
  workPhone : [this.selectedLabData.workPhone],
  laboratoryManger : [this.selectedLabData.laboratoryManger],
  basicMatrial : [this.selectedLabData.basicMatrial],
  subMatrial : [this.selectedLabData.subMatrial],
  testingCode : [this.selectedLabData.testingCode],
  testingName : [this.selectedLabData.testingName],
  branchCode : [this.selectedLabData.branchCode],
  existing : [this.selectedLabData.existing]
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
    return this.labDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.labDataForm.controls)) {
      this.labDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
  }
}

