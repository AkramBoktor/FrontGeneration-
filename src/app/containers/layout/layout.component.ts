import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <div class="container-fluid layout-content">
      <ng-content></ng-content>
    </div>

  `,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
