
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { OfficesFromThePostOffice } from 'app/shared/models/offices-from-the-post-office';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { OfficesFromThePostOfficeService } from '../shared/offices-from-the-post-office.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-offices-from-the-post-office-edit',
  templateUrl: './offices-from-the-post-office-edit.component.html',
  styleUrls: ['./offices-from-the-post-office-edit.component.scss'],
  providers: []
})

export class OfficesFromThePostOfficeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOfficesFromThePostOffice: OfficesFromThePostOffice;
  officesFromThePostOfficeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOfficesFromThePostOfficeDialog: any,
    @Optional() public dialogRef: MatDialogRef<OfficesFromThePostOfficeEditComponent>,
    public officesFromThePostOfficeService: OfficesFromThePostOfficeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOfficesFromThePostOffice = new OfficesFromThePostOffice();
    this.selectedOfficesFromThePostOffice = this.selectedOfficesFromThePostOfficeDialog.data || this.selectedOfficesFromThePostOffice;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.officesFromThePostOfficeForm = this.formBuilder.group({
      
  id : [this.selectedOfficesFromThePostOffice.id],
  postOfficeReceiptYear : [this.selectedOfficesFromThePostOffice.postOfficeReceiptYear, [ Validators.required ]],
  iD : [this.selectedOfficesFromThePostOffice.iD, [ Validators.required ]],
  officeNmae : [this.selectedOfficesFromThePostOffice.officeNmae, [ Validators.required ]],
  governorate : [this.selectedOfficesFromThePostOffice.governorate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.officesFromThePostOfficeService.update(this.officesFromThePostOfficeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.officesFromThePostOfficeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.officesFromThePostOfficeForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}
