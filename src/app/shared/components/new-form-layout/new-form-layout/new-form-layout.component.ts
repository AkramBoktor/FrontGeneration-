import { Component, OnInit, EventEmitter, Output, Input, ContentChild, TemplateRef } from '@angular/core';
import { NewFormContainerDirective } from './new-form-container.directive';
 
@Component({
  selector: 'app-new-form-layout',
  templateUrl: './new-form-layout.component.html',
  styleUrls: ['./new-form-layout.component.scss']
})
export class NewFormLayoutComponent implements OnInit {
  @Input() pageTitle: string;
  @Output() submitClicked: EventEmitter<any> = new EventEmitter();
  @Output() back: EventEmitter<any> = new EventEmitter();

  @ContentChild(NewFormContainerDirective, { read: TemplateRef, static: true }) newFormContainer;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitClicked.emit();
  }

  onBack() {
    this.back.emit();
  }
}
