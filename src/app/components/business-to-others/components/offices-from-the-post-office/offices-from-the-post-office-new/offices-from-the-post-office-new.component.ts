
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { OfficesFromThePostOffice } from 'app/shared/models/offices-from-the-post-office';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { OfficesFromThePostOfficeService } from '../shared/offices-from-the-post-office.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-offices-from-the-post-office-new',
  templateUrl: './offices-from-the-post-office-new.component.html',
  styleUrls: ['./offices-from-the-post-office-new.component.scss'],
  providers: [
    ]
})

export class OfficesFromThePostOfficeNewComponent extends AppBaseComponent implements OnInit {
  officesFromThePostOfficeForm: FormGroup;
  @Input() selectedOfficesFromThePostOffice: OfficesFromThePostOffice;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<OfficesFromThePostOfficeNewComponent>,
    public officesFromThePostOfficeService: OfficesFromThePostOfficeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOfficesFromThePostOffice = new OfficesFromThePostOffice();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.officesFromThePostOfficeForm = this.formBuilder.group({
     
  id : [0],
  postOfficeReceiptYear : [this.selectedOfficesFromThePostOffice.postOfficeReceiptYear, [ Validators.required ]],
  iD : [this.selectedOfficesFromThePostOffice.iD, [ Validators.required ]],
  officeNmae : [this.selectedOfficesFromThePostOffice.officeNmae, [ Validators.required ]],
  governorate : [this.selectedOfficesFromThePostOffice.governorate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.officesFromThePostOfficeService.create(this.officesFromThePostOfficeForm.value)
        .pipe(switchMap(x => {
			return this.officesFromThePostOfficeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.officesFromThePostOfficeForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
 }
