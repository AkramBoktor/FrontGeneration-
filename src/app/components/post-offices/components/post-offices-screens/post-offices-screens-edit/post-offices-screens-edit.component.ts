
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PostOfficesScreens } from 'app/shared/models/post-offices-screens';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { PostOfficesScreensService } from '../shared/post-offices-screens.service';




@Component({
  selector: 'app-post-offices-screens-edit',
  templateUrl: './post-offices-screens-edit.component.html',
  styleUrls: ['./post-offices-screens-edit.component.scss'],
  providers: []
})

export class PostOfficesScreensEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPostOfficesScreens: PostOfficesScreens;
  postOfficesScreensForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private villagesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
districtSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('district', { static: true }) DistrictSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPostOfficesScreensDialog: any,
    @Optional() public dialogRef: MatDialogRef<PostOfficesScreensEditComponent>,
    public postOfficesScreensService: PostOfficesScreensService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPostOfficesScreens = new PostOfficesScreens();
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
      
  id : [this.selectedPostOfficesScreens.id],
  identityNumber : [this.selectedPostOfficesScreens.identityNumber, [ Validators.required ]],
  x : [this.selectedPostOfficesScreens.x, [ Validators.required ]],
  y : [this.selectedPostOfficesScreens.y, [ Validators.required ]],
  z : [this.selectedPostOfficesScreens.z, [ Validators.required ]],
  office : [this.selectedPostOfficesScreens.office, [ Validators.required ]],
  governorate : [this.selectedPostOfficesScreens.governorate, [ Validators.required ]],
  district : [this.selectedPostOfficesScreens.district, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.postOfficesScreensService.update(this.postOfficesScreensForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.postOfficesScreensService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.postOfficesScreensForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.villagesService = new LookupService('villages', this.http);
  }
}
