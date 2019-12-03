
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CanceledTender } from 'app/shared/models/canceled-tender';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CanceledTenderService } from '../shared/canceled-tender.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-canceled-tender-new',
  templateUrl: './canceled-tender-new.component.html',
  styleUrls: ['./canceled-tender-new.component.scss'],
  providers: [
    ]
})

export class CanceledTenderNewComponent extends AppBaseComponent implements OnInit {
  canceledTenderForm: FormGroup;
  @Input() selectedCanceledTender: CanceledTender;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CanceledTenderNewComponent>,
    public canceledTenderService: CanceledTenderService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCanceledTender = new CanceledTender();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.canceledTenderForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedCanceledTender.bidNumber, [ Validators.required,Validators.minLength(1) ]],
  tenderNumber : [this.selectedCanceledTender.tenderNumber, [ Validators.required,Validators.minLength(1) ]],
  contractorCode : [this.selectedCanceledTender.contractorCode, [ ]],
  schoolNumber : [this.selectedCanceledTender.schoolNumber, [ Validators.required,Validators.minLength(1) ]],
  schoolName : [this.selectedCanceledTender.schoolName, [ ]],
  exclusionReason : [this.selectedCanceledTender.exclusionReason, [ Validators.required ]],
  offeringType : [this.selectedCanceledTender.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.canceledTenderService.create(this.canceledTenderForm.value)
        .pipe(switchMap(x => {
			return this.canceledTenderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.canceledTenderForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
