import * as rxjs from 'rxjs';
import * as i0 from '@angular/core';
import { Routes } from '@angular/router';

declare class TrainingService {
    apiName: string;
    private restService;
    sample(): rxjs.Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrainingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TrainingService>;
}

declare class TrainingComponent {
    protected readonly service: TrainingService;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<TrainingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TrainingComponent, "lib-training", never, {}, {}, never, never, true, never>;
}

declare const TRAINING_ROUTES: Routes;

export { TRAINING_ROUTES, TrainingComponent, TrainingService };
