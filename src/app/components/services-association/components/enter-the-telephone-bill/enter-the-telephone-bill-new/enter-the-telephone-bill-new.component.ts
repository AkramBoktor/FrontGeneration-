
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EnterTheTelephoneBill } from 'app/shared/models/enter-the-telephone-bill';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnterTheTelephoneBillService } from '../shared/enter-the-telephone-bill.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-enter-the-telephone-bill-new',
  templateUrl: './enter-the-telephone-bill-new.component.html',
  styleUrls: ['./enter-the-telephone-bill-new.component.scss'],
  providers: [
    ]
})

export class EnterTheTelephoneBillNewComponent extends AppBaseComponent implements OnInit {
  enterTheTelephoneBillForm: FormGroup;
  @Input() selectedEnterTheTelephoneBill: EnterTheTelephoneBill;
  errorMessages: FormControlError[] = [
        
  ];

  private departmentsSectionsService: LookupService;

  
admistrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('admistrationCode', { static: true }) AdmistrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EnterTheTelephoneBillNewComponent>,
    public enterTheTelephoneBillService: EnterTheTelephoneBillService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnterTheTelephoneBill = new EnterTheTelephoneBill();

    
	this.admistrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});


    this.enterTheTelephoneBillForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedEnterTheTelephoneBill.employeeCode, [ Validators.required ]],
  phoneNumber : [this.selectedEnterTheTelephoneBill.phoneNumber, [ Validators.required ]],
  admistrationCode : [this.selectedEnterTheTelephoneBill.admistrationCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.enterTheTelephoneBillService.create(this.enterTheTelephoneBillForm.value)
        .pipe(switchMap(x => {
			return this.enterTheTelephoneBillService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.enterTheTelephoneBillForm.get(name);
    }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
 }
