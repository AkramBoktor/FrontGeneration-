
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RegisterTheMovementOfReadyToilets } from 'app/shared/models/register-the-movement-of-ready-toilets';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisterTheMovementOfReadyToiletsService } from '../shared/register-the-movement-of-ready-toilets.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register-the-movement-of-ready-toilets-new',
  templateUrl: './register-the-movement-of-ready-toilets-new.component.html',
  styleUrls: ['./register-the-movement-of-ready-toilets-new.component.scss'],
  providers: [
    ]
})

export class RegisterTheMovementOfReadyToiletsNewComponent extends AppBaseComponent implements OnInit {
  registerTheMovementOfReadyToiletsForm: FormGroup;
  @Input() selectedRegisterTheMovementOfReadyToilets: RegisterTheMovementOfReadyToilets;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RegisterTheMovementOfReadyToiletsNewComponent>,
    public registerTheMovementOfReadyToiletsService: RegisterTheMovementOfReadyToiletsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterTheMovementOfReadyToilets = new RegisterTheMovementOfReadyToilets();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه ',
	});


    this.registerTheMovementOfReadyToiletsForm = this.formBuilder.group({
     
  id : [0],
  orderDate : [this.selectedRegisterTheMovementOfReadyToilets.orderDate, [ Validators.required ]],
  toiletCode : [this.selectedRegisterTheMovementOfReadyToilets.toiletCode, [ Validators.required ]],
  schoolRequiredTransport : [this.selectedRegisterTheMovementOfReadyToilets.schoolRequiredTransport, [ Validators.required ]],
  transportationSchool : [this.selectedRegisterTheMovementOfReadyToilets.transportationSchool, [ Validators.required ]],
  governorate : [this.selectedRegisterTheMovementOfReadyToilets.governorate, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.registerTheMovementOfReadyToiletsService.create(this.registerTheMovementOfReadyToiletsForm.value)
        .pipe(switchMap(x => {
			return this.registerTheMovementOfReadyToiletsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.registerTheMovementOfReadyToiletsForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
 }
