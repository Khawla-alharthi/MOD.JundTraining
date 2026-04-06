import * as i0 from '@angular/core';
import { inject, Injectable, Component } from '@angular/core';
import { RestService, authGuard, permissionGuard, RouterOutletComponent } from '@abp/ng.core';

class TrainingService {
    constructor() {
        this.apiName = 'Training';
        this.restService = inject(RestService);
    }
    sample() {
        return this.restService.request({ method: 'GET', url: '/api/training/example' }, { apiName: this.apiName });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: TrainingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: TrainingService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: TrainingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class TrainingComponent {
    constructor() {
        this.service = inject(TrainingService);
        this.service.sample().subscribe(console.log);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: TrainingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.0.9", type: TrainingComponent, isStandalone: true, selector: "lib-training", ngImport: i0, template: ` <p>training works!</p> `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: TrainingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-training',
                    template: ` <p>training works!</p> `,
                }]
        }], ctorParameters: () => [] });

var training_component = /*#__PURE__*/Object.freeze({
    __proto__: null,
    TrainingComponent: TrainingComponent
});

const FRUIT_ROUTES = [
    {
        path: '',
        loadComponent: () => {
            return import('./m-oD-training-fruit.component-DlNISS6W.mjs').then(function (n) { return n.f; }).then(c => c.FruitComponent);
        },
        canActivate: [authGuard, permissionGuard],
    },
];

const TRAINING_ROUTES = [
    {
        path: '',
        pathMatch: 'full',
        component: RouterOutletComponent,
        children: [
            {
                path: '',
                loadComponent: () => Promise.resolve().then(function () { return training_component; }).then(c => c.TrainingComponent),
            },
        ],
    },
    { path: 'fruits', children: FRUIT_ROUTES },
];

/**
 * Generated bundle index. Do not edit.
 */

export { TRAINING_ROUTES, TrainingComponent, TrainingService };
//# sourceMappingURL=m-oD-training.mjs.map
