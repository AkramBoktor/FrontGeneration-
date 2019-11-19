
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DependentName } from 'app/shared/models/dependent-name';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { DependentNameService } from '../shared/dependent-name.service';


@Component({
  selector: 'app-dependent-name-new',
  templateUrl: './dependent-name-new.component.html',
  styleUrls: ['./dependent-name-new.component.scss'],
  providers: [
    ]
})

export class DependentNameNewComponent extends AppBaseComponent implements OnInit {
  dependentNameForm: FormGroup;
  @Input() selectedDependentName: DependentName;
  errorMessages: FormControlError[] = [
        
  ];

  private relationshipTypesService: LookupService;

  
relationshipTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('relationshipType', { static: true }) RelationshipTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DependentNameNewComponent>,
    public dependentNameService: DependentNameService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDependentName = new DependentName();

    
	this.relationshipTypeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العلاقه',
	});


    this.dependentNameForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedDependentName.employeeCode, [ Validators.required ]],
  name : [this.selectedDependentName.name, [ Validators.required ]],
  birthDate : [this.selectedDependentName.birthDate, [ Validators.required ]],
  relationshipType : [this.selectedDependentName.relationshipType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dependentNameService.create(this.dependentNameForm.value)
        .pipe(switchMap(x => {
			return this.dependentNameService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dependentNameForm.get(name);
    }

  initializeLookupServices() {
    this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
 }
