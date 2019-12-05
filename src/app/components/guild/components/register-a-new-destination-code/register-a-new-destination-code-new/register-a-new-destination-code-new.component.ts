
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RegisterANewDestinationCode } from 'app/shared/models/register-a-new-destination-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisterANewDestinationCodeService } from '../shared/register-a-new-destination-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register-a-new-destination-code-new',
  templateUrl: './register-a-new-destination-code-new.component.html',
  styleUrls: ['./register-a-new-destination-code-new.component.scss'],
  providers: [
    ]
})

export class RegisterANewDestinationCodeNewComponent extends AppBaseComponent implements OnInit {
  registerANewDestinationCodeForm: FormGroup;
  @Input() selectedRegisterANewDestinationCode: RegisterANewDestinationCode;
  errorMessages: FormControlError[] = [
        
  ];

  private entityCodesService: LookupService;

  
entityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RegisterANewDestinationCodeNewComponent>,
    public registerANewDestinationCodeService: RegisterANewDestinationCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewDestinationCode = new RegisterANewDestinationCode();

    
	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود  الجهة ',
	});


    this.registerANewDestinationCodeForm = this.formBuilder.group({
     
  id : [0],
  entityAmount : [this.selectedRegisterANewDestinationCode.entityAmount, [ Validators.required ]],
  entityName : [this.selectedRegisterANewDestinationCode.entityName, [ Validators.required ]],
  entityCode : [this.selectedRegisterANewDestinationCode.entityCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.registerANewDestinationCodeService.create(this.registerANewDestinationCodeForm.value)
        .pipe(switchMap(x => {
			return this.registerANewDestinationCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.registerANewDestinationCodeForm.get(name);
    }

  initializeLookupServices() {
    this.entityCodesService = new LookupService('entitycodes', this.http);
  }
 }
