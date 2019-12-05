
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LabData } from 'app/shared/models/lab-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LabDataService } from '../shared/lab-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-lab-data-edit',
  templateUrl: './lab-data-edit.component.html',
  styleUrls: ['./lab-data-edit.component.scss'],
  providers: []
})

export class LabDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLabData: LabData;
  labDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private yesOrNoService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
existingSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('existing', { static: true }) ExistingSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLabDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<LabDataEditComponent>,
    public labDataService: LabDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLabData = new LabData();
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
      
  id : [this.selectedLabData.id],
  laboratoryCode : [this.selectedLabData.laboratoryCode, [ Validators.required ]],
  laboratoryAddress : [this.selectedLabData.laboratoryAddress, [ Validators.required ]],
  workPhone : [this.selectedLabData.workPhone, [ Validators.required ]],
  laboratoryManger : [this.selectedLabData.laboratoryManger, [ Validators.required ]],
  basicMatrial : [this.selectedLabData.basicMatrial, [ Validators.required ]],
  subMatrial : [this.selectedLabData.subMatrial, [ Validators.required ]],
  testingCode : [this.selectedLabData.testingCode, [ Validators.required ]],
  testingName : [this.selectedLabData.testingName, [ Validators.required ]],
  branchCode : [this.selectedLabData.branchCode, [ Validators.required ]],
  existing : [this.selectedLabData.existing, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.labDataService.update(this.labDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.labDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.labDataForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
  }
}
