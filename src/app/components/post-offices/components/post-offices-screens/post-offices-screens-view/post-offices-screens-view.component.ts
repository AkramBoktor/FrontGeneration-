
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PostOfficesScreens } from 'app/shared/models/post-offices-screens';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PostOfficesScreensService } from '../shared/post-offices-screens.service';

@Component({
  selector: 'app-post-offices-screens-view',
  templateUrl: './post-offices-screens-view.component.html',
  styleUrls: ['./post-offices-screens-view.component.scss'],
  providers: []
})

export class PostOfficesScreensViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPostOfficesScreens: PostOfficesScreens;
  postOfficesScreensForm: FormGroup;

  private governoratesService: LookupService;
private villagesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
districtSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPostOfficesScreensDialog: any,
    @Optional() public dialogRef: MatDialogRef<PostOfficesScreensViewComponent>,
    public postOfficesScreensService: PostOfficesScreensService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPostOfficesScreens = this.selectedPostOfficesScreensDialog.data || this.selectedPostOfficesScreens;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.districtSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحي',
	});


    this.postOfficesScreensForm = this.formBuilder.group({
      
  identityNumber : [this.selectedPostOfficesScreens.identityNumber],
  x : [this.selectedPostOfficesScreens.x],
  y : [this.selectedPostOfficesScreens.y],
  z : [this.selectedPostOfficesScreens.z],
  office : [this.selectedPostOfficesScreens.office],
  governorate : [this.selectedPostOfficesScreens.governorate],
  district : [this.selectedPostOfficesScreens.district]
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
    return this.postOfficesScreensForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.postOfficesScreensForm.controls)) {
      this.postOfficesScreensForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.villagesService = new LookupService('villages', this.http);
  }
}

