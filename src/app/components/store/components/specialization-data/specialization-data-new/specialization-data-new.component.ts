
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SpecializationData } from 'app/shared/models/specialization-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { SpecializationDataService } from '../shared/specialization-data.service';


@Component({
  selector: 'app-specialization-data-new',
  templateUrl: './specialization-data-new.component.html',
  styleUrls: ['./specialization-data-new.component.scss'],
  providers: [
    ]
})

export class SpecializationDataNewComponent extends AppBaseComponent implements OnInit {
  specializationDataForm: FormGroup;
  @Input() selectedSpecializationData: SpecializationData;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;

  
administrationOrRegionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrRegion', { static: true }) AdministrationOrRegionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SpecializationDataNewComponent>,
    public specializationDataService: SpecializationDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSpecializationData = new SpecializationData();

    
	this.administrationOrRegionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة او المنطقه',
	});


    this.specializationDataForm = this.formBuilder.group({
     
  id : [0],
  fiscalYear : [this.selectedSpecializationData.fiscalYear, [ Validators.required ]],
  product : [this.selectedSpecializationData.product, [ Validators.required ]],
  allocated : [this.selectedSpecializationData.allocated, [ Validators.required ]],
  spent : [this.selectedSpecializationData.spent, [ Validators.required ]],
  administrationOrRegion : [this.selectedSpecializationData.administrationOrRegion, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.specializationDataService.create(this.specializationDataForm.value)
        .pipe(switchMap(x => {
			return this.specializationDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.specializationDataForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
 }
