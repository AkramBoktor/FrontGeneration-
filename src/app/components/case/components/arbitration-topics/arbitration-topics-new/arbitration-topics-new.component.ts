
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ArbitrationTopics } from 'app/shared/models/arbitration-topics';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { switchMap } from 'rxjs/operators';
import { ArbitrationTopicsService } from '../shared/arbitration-topics.service';


@Component({
  selector: 'app-arbitration-topics-new',
  templateUrl: './arbitration-topics-new.component.html',
  styleUrls: ['./arbitration-topics-new.component.scss'],
  providers: [
    ]
})

export class ArbitrationTopicsNewComponent extends AppBaseComponent implements OnInit {
  arbitrationTopicsForm: FormGroup;
  @Input() selectedArbitrationTopics: ArbitrationTopics;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ArbitrationTopicsNewComponent>,
    public arbitrationTopicsService: ArbitrationTopicsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedArbitrationTopics = new ArbitrationTopics();

    

    this.arbitrationTopicsForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedArbitrationTopics.code, [ Validators.required ]],
  name : [this.selectedArbitrationTopics.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.arbitrationTopicsService.create(this.arbitrationTopicsForm.value)
        .pipe(switchMap(x => {
			return this.arbitrationTopicsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.arbitrationTopicsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
