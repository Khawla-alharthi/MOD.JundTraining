import { Component, inject } from '@angular/core';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'lib-training',
  template: ` <p>training works!</p> `,
})
export class TrainingComponent {
  protected readonly service = inject(TrainingService);

  constructor() {
    this.service.sample().subscribe(console.log);
  }
}
