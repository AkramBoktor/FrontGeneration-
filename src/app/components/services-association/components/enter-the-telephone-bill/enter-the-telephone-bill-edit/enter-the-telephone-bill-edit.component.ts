
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EnterTheTelephoneBill } from 'app/shared/models/enter-the-telephone-bill';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EnterTheTelephoneBillService } from '../shared/enter-the-telephone-bill.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-enter-the-telephone-bill-edit',
  templateUrl: './enter-the-telephone-bill-edit.component.html',
  styleUrls: ['./enter-the-telephone-bill-edit.component.scss'],
  providers: []
})

export class EnterTheTelephoneBillEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnterTheTelephoneBill: EnterTheTelephoneBill;
  enterTheTelephoneBillForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private departmentsSectionsService: LookupService;

  
admistrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('admistrationCode', { static: true }) AdmistrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnterTheTelephoneBillDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnterTheTelephoneBillEditComponent>,
    public enterTheTelephoneBillService: EnterTheTelephoneBillService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnterTheTelephoneBill = new EnterTheTelephoneBill();
    this.selectedEnterTheTelephoneBill = this.selectedEnterTheTelephoneBillDialog.data || this.selectedEnterTheTelephoneBill;

    
	this.admistrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});


    this.enterTheTelephoneBillForm = this.formBuilder.group({
      
  id : [this.selectedEnterTheTelephoneBill.id],
  employeeCode : [this.selectedEnterTheTelephoneBill.employeeCode, [ Validators.required ]],
  phoneNumber : [this.selectedEnterTheTelephoneBill.phoneNumber, [ Validators.required ]],
  admistrationCode : [this.selectedEnterTheTelephoneBill.admistrationCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.enterTheTelephoneBillService.update(this.enterTheTelephoneBillForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.enterTheTelephoneBillService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.enterTheTelephoneBillForm.get(name);
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}
