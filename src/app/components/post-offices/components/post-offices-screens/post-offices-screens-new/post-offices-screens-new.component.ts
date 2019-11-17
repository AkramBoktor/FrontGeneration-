
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PostOfficesScreens } from 'app/shared/models/post-offices-screens';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { PostOfficesScreensService } from '../shared/post-offices-screens.service';


@Component({
  selector: 'app-post-offices-screens-new',
  templateUrl: './post-offices-screens-new.component.html',
  styleUrls: ['./post-offices-screens-new.component.scss'],
  providers: [
    ]
})

export class PostOfficesScreensNewComponent extends AppBaseComponent implements OnInit {
  postOfficesScreensForm: FormGroup;
  @Input() selectedPostOfficesScreens: PostOfficesScreens;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private villagesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
districtSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('district', { static: true }) DistrictSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PostOfficesScreensNewComponent>,
    public postOfficesScreensService: PostOfficesScreensService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPostOfficesScreens = new PostOfficesScreens();

    
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
     
  id : [0],
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
    this.postOfficesScreensService.create(this.postOfficesScreensForm.value)
        .pipe(switchMap(x => {
			return this.postOfficesScreensService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.postOfficesScreensForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.villagesService = new LookupService('villages', this.http);
  }
 }
