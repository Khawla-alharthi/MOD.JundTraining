import * as i0 from '@angular/core';
import { inject, Injectable, Directive, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i2$1 from '@angular/forms';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule, NgbDateAdapter, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import * as i3 from '@swimlane/ngx-datatable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RestService, ListService, TrackByService, PermissionService, PermissionDirective, LocalizationPipe } from '@abp/ng.core';
import { ConfirmationService, Confirmation, NgxDatatableDefaultDirective, NgxDatatableListDirective, DateAdapter, TimeAdapter } from '@abp/ng.theme.shared';
import { PageComponent, PageToolbarContainerComponent } from '@abp/ng.components/page';
import { AdvancedEntityFiltersComponent, AdvancedEntityFiltersFormComponent } from '@volo/abp.commercial.ng.ui';
import { filter, switchMap, finalize, tap } from 'rxjs/operators';

class FruitService {
    constructor() {
        this.restService = inject(RestService);
        this.apiName = 'Training';
        this.create = (input, config) => this.restService.request({
            method: 'POST',
            url: '/api/training/fruits',
            body: input,
        }, { apiName: this.apiName, ...config });
        this.delete = (id, config) => this.restService.request({
            method: 'DELETE',
            url: `/api/training/fruits/${id}`,
        }, { apiName: this.apiName, ...config });
        this.get = (id, config) => this.restService.request({
            method: 'GET',
            url: `/api/training/fruits/${id}`,
        }, { apiName: this.apiName, ...config });
        this.getDownloadToken = (config) => this.restService.request({
            method: 'GET',
            url: '/api/training/fruits/download-token',
        }, { apiName: this.apiName, ...config });
        this.getFile = (input, config) => this.restService.request({
            method: 'GET',
            responseType: 'blob',
            url: '/api/training/fruits/file',
            params: { downloadToken: input.downloadToken, fileId: input.fileId },
        }, { apiName: this.apiName, ...config });
        this.getList = (input, config) => this.restService.request({
            method: 'GET',
            url: '/api/training/fruits',
            params: {
                filterText: input.filterText,
                sorting: input.sorting,
                skipCount: input.skipCount,
                maxResultCount: input.maxResultCount,
                nameAr: input.nameAr,
            },
        }, { apiName: this.apiName, ...config });
        this.update = (id, input, config) => this.restService.request({
            method: 'PUT',
            url: `/api/training/fruits/${id}`,
            body: input,
        }, { apiName: this.apiName, ...config });
        this.uploadFile = (input, config) => this.restService.request({
            method: 'POST',
            url: '/api/training/fruits/upload-file',
            body: input,
        }, { apiName: this.apiName, ...config });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class AbstractFruitViewService {
    constructor() {
        this.proxyService = inject(FruitService);
        this.confirmationService = inject(ConfirmationService);
        this.list = inject(ListService);
        this.data = {
            items: [],
            totalCount: 0,
        };
        this.filters = {};
    }
    delete(record) {
        this.confirmationService
            .warn('Training::DeleteConfirmationMessage', 'Training::AreYouSure', {
            messageLocalizationParams: [],
        })
            .pipe(filter(status => status === Confirmation.Status.confirm), switchMap(() => this.proxyService.delete(record.id)))
            .subscribe(this.list.get);
    }
    hookToQuery() {
        const getData = (query) => this.proxyService.getList({
            ...query,
            ...this.filters,
            filterText: query.filter,
        });
        const setData = (list) => {
            this.data = list;
        };
        this.list.hookToQuery(getData).subscribe(setData);
    }
    clearFilters() {
        this.filters = {};
        this.list.get();
    }
}

class FruitViewService extends AbstractFruitViewService {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitViewService, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitViewService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitViewService, decorators: [{
            type: Injectable
        }] });

class AbstractFruitDetailViewService {
    constructor() {
        this.fb = inject(FormBuilder);
        this.track = inject(TrackByService);
        this.proxyService = inject(FruitService);
        this.list = inject(ListService);
        this.isBusy = false;
        this.isVisible = false;
        this.selected = {};
    }
    createRequest() {
        const formValues = {
            ...this.form.value,
        };
        if (this.selected) {
            return this.proxyService.update(this.selected.id, {
                ...formValues,
                concurrencyStamp: this.selected.concurrencyStamp,
            });
        }
        return this.proxyService.create(formValues);
    }
    buildForm() {
        const { nameAr } = this.selected || {};
        this.form = this.fb.group({
            nameAr: [nameAr ?? null, []],
        });
    }
    showForm() {
        this.buildForm();
        this.isVisible = true;
    }
    create() {
        this.selected = undefined;
        this.showForm();
    }
    update(record) {
        this.selected = record;
        this.showForm();
    }
    hideForm() {
        this.isVisible = false;
    }
    submitForm() {
        if (this.form.invalid)
            return;
        this.isBusy = true;
        const request = this.createRequest().pipe(finalize(() => (this.isBusy = false)), tap(() => this.hideForm()));
        request.subscribe(this.list.get);
    }
    changeVisible($event) {
        this.isVisible = $event;
    }
}

class FruitDetailViewService extends AbstractFruitDetailViewService {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitDetailViewService, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitDetailViewService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitDetailViewService, decorators: [{
            type: Injectable
        }] });

const ChildTabDependencies = [];
const ChildComponentDependencies = [];
class AbstractFruitComponent {
    constructor() {
        this.list = inject(ListService);
        this.service = inject(FruitViewService);
        this.serviceDetail = inject(FruitDetailViewService);
        this.permissionService = inject(PermissionService);
        this.title = 'Training::Fruits';
        this.isActionButtonVisible = null;
    }
    ngOnInit() {
        this.service.hookToQuery();
        this.checkActionButtonVisibility();
    }
    clearFilters() {
        this.service.clearFilters();
    }
    showForm() {
        this.serviceDetail.showForm();
    }
    create() {
        this.serviceDetail.selected = undefined;
        this.serviceDetail.showForm();
    }
    update(record) {
        this.serviceDetail.update(record);
    }
    delete(record) {
        this.service.delete(record);
    }
    checkActionButtonVisibility() {
        if (this.isActionButtonVisible !== null) {
            return;
        }
        const canEdit = this.permissionService.getGrantedPolicy('Training.Fruits.Edit');
        const canDelete = this.permissionService.getGrantedPolicy('Training.Fruits.Delete');
        this.isActionButtonVisible = canEdit || canDelete;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: AbstractFruitComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.0.9", type: AbstractFruitComponent, isStandalone: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: AbstractFruitComponent, decorators: [{
            type: Directive
        }] });

class FruitComponent extends AbstractFruitComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.9", ngImport: i0, type: FruitComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.0.9", type: FruitComponent, isStandalone: true, selector: "lib-fruit", providers: [
            ListService,
            FruitViewService,
            FruitDetailViewService,
            { provide: NgbDateAdapter, useClass: DateAdapter },
            { provide: NgbTimeAdapter, useClass: TimeAdapter },
        ], usesInheritance: true, ngImport: i0, template: "<abp-page [title]=\"title | abpLocalization\">\n  <abp-page-toolbar-container class=\"col\">\n    <!--<suite-custom-code-block-0>-->\n    <!--</suite-custom-code-block-0>-->\n    <div class=\"text-lg-end pt-2\">\n      <!--<suite-custom-code-block-1>-->\n      <!--</suite-custom-code-block-1>-->\n\n      <button\n        *abpPermission=\"'Training.Fruits.Create'\"\n        class=\"btn btn-primary btn-sm\"\n        type=\"button\"\n        (click)=\"create()\"\n      >\n        <i class=\"fa fa-plus me-1\" aria-hidden=\"true\"></i>\n        {{ 'Training::NewFruit' | abpLocalization }}\n      </button>\n      <!--<suite-custom-code-block-2>-->\n      <!--</suite-custom-code-block-2>-->\n    </div>\n  </abp-page-toolbar-container>\n\n  <abp-advanced-entity-filters localizationSourceName=\"Training\" [list]=\"list\">\n    @if (service.filters; as filters) {\n      <abp-advanced-entity-filters-form>\n        <form #filterForm (keyup.enter)=\"list.get()\">\n          <!--<suite-custom-code-block-3>-->\n          <!--</suite-custom-code-block-3>-->\n          <div class=\"row\">\n            <div class=\"col-12 col-sm-auto\">\n              <div class=\"mb-3\">\n                <label class=\"form-label\" for=\"nameArFilter\">\n                  {{ 'Training::NameAr' | abpLocalization }}\n                </label>\n\n                <input\n                  id=\"nameArFilter\"\n                  class=\"form-control\"\n                  [(ngModel)]=\"filters.nameAr\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                />\n              </div>\n            </div>\n\n            <div class=\"col-12 col-sm-auto align-self-end mb-3\">\n              <div class=\"row\">\n                <div class=\"col-6 col-sm-auto d-grid\">\n                  <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"clearFilters()\">\n                    <span>{{ 'AbpUi::Clear' | abpLocalization }}</span>\n                  </button>\n                </div>\n                <div class=\"col-6 col-sm-auto d-grid\">\n                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"list.get()\">\n                    <span>{{ 'AbpUi::Refresh' | abpLocalization }}</span>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n          <!--<suite-custom-code-block-4>-->\n          <!--</suite-custom-code-block-4>-->\n        </form>\n      </abp-advanced-entity-filters-form>\n    }\n  </abp-advanced-entity-filters>\n  <!--<suite-custom-code-block-5>-->\n  <!--</suite-custom-code-block-5>-->\n  <div class=\"card\">\n    <!--<suite-custom-code-block-6>-->\n    <!--</suite-custom-code-block-6>-->\n    <div class=\"card-body\">\n      <!--<suite-custom-code-block-7>-->\n      <!--</suite-custom-code-block-7>-->\n      <ngx-datatable\n        default\n        [rows]=\"service.data.items\"\n        [count]=\"service.data.totalCount\"\n        [list]=\"list\"\n      >\n        <!--<suite-custom-code-block-8>-->\n        <!--</suite-custom-code-block-8>-->\n\n        @if (isActionButtonVisible) {\n          <ngx-datatable-column\n            [name]=\"'AbpUi::Actions' | abpLocalization\"\n            [maxWidth]=\"150\"\n            [width]=\"150\"\n            [sortable]=\"false\"\n          >\n            <ng-template let-row=\"row\" let-i=\"rowIndex\" ngx-datatable-cell-template>\n              <div ngbDropdown container=\"body\" class=\"d-inline-block\">\n                <button\n                  class=\"btn btn-primary btn-sm dropdown-toggle\"\n                  data-toggle=\"dropdown\"\n                  aria-haspopup=\"true\"\n                  ngbDropdownToggle\n                >\n                  <i class=\"fa fa-cog me-1\" aria-hidden=\"true\"></i>\n                  {{ 'AbpUi::Actions' | abpLocalization }}\n                </button>\n\n                <div ngbDropdownMenu>\n                  <button\n                    ngbDropdownItem\n                    *abpPermission=\"'Training.Fruits.Edit'\"\n                    (click)=\"update(row)\"\n                  >\n                    {{ 'AbpUi::Edit' | abpLocalization }}\n                  </button>\n\n                  <button\n                    ngbDropdownItem\n                    *abpPermission=\"'Training.Fruits.Delete'\"\n                    (click)=\"delete(row)\"\n                  >\n                    {{ 'AbpUi::Delete' | abpLocalization }}\n                  </button>\n                </div>\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n        }\n        <ngx-datatable-column name=\"{{ 'Training::NameAr' | abpLocalization }}\" prop=\"nameAr\">\n          <ng-template let-row=\"row\" ngx-datatable-cell-template>\n            {{ row.nameAr }}\n          </ng-template>\n        </ngx-datatable-column>\n        <!--<suite-custom-code-block-9>-->\n        <!--</suite-custom-code-block-9>-->\n      </ngx-datatable>\n      <!--<suite-custom-code-block-10>-->\n      <!--</suite-custom-code-block-10>-->\n    </div>\n  </div>\n  <!--<suite-custom-code-block-11>-->\n  <!--</suite-custom-code-block-11>-->\n</abp-page>\n<!--<suite-custom-code-block-12>-->\n<!--</suite-custom-code-block-12>-->\n\n@defer (when serviceDetail.isVisible) {\n  @if (serviceDetail.isVisible) {\n    <lib-fruit-detail-modal />\n  }\n}\n", styles: ["::ng-deep .datatable-row-detail{background:transparent!important}\n"], dependencies: [{ kind: "ngmodule", type: NgbCollapseModule }, { kind: "ngmodule", type: NgbDatepickerModule }, { kind: "ngmodule", type: NgbTimepickerModule }, { kind: "ngmodule", type: NgbDropdownModule }, { kind: "directive", type: i2.NgbDropdown, selector: "[ngbDropdown]", inputs: ["autoClose", "dropdownClass", "open", "placement", "popperOptions", "container", "display"], outputs: ["openChange"], exportAs: ["ngbDropdown"] }, { kind: "directive", type: i2.NgbDropdownToggle, selector: "[ngbDropdownToggle]" }, { kind: "directive", type: i2.NgbDropdownMenu, selector: "[ngbDropdownMenu]" }, { kind: "directive", type: i2.NgbDropdownItem, selector: "[ngbDropdownItem]", inputs: ["tabindex", "disabled"] }, { kind: "directive", type: i2.NgbDropdownButtonItem, selector: "button[ngbDropdownItem]" }, { kind: "ngmodule", type: NgxValidateCoreModule }, { kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i2$1.NgForm, selector: "form:not([ngNoForm]):not([formGroup]):not([formArray]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "ngmodule", type: NgxDatatableModule }, { kind: "component", type: i3.DatatableComponent, selector: "ngx-datatable", inputs: ["targetMarkerTemplate", "rows", "groupRowsBy", "groupedRows", "columns", "selected", "scrollbarV", "scrollbarVDynamic", "scrollbarH", "rowHeight", "columnMode", "headerHeight", "footerHeight", "externalPaging", "externalSorting", "limit", "count", "offset", "loadingIndicator", "ghostLoadingIndicator", "selectionType", "reorderable", "swapColumns", "sortType", "sorts", "cssClasses", "messages", "rowClass", "selectCheck", "displayCheck", "groupExpansionDefault", "trackByProp", "selectAllRowsOnPage", "virtualization", "treeFromRelation", "treeToRelation", "summaryRow", "summaryHeight", "summaryPosition", "disableRowCheck", "rowDraggable", "enableClearingSortState", "rowIdentity"], outputs: ["scroll", "activate", "select", "sort", "page", "reorder", "resize", "tableContextmenu", "treeAction", "rowDragEvents"] }, { kind: "directive", type: i3.DataTableColumnDirective, selector: "ngx-datatable-column", inputs: ["name", "prop", "bindAsUnsafeHtml", "frozenLeft", "frozenRight", "flexGrow", "resizeable", "comparator", "pipe", "sortable", "draggable", "canAutoResize", "minWidth", "width", "maxWidth", "checkboxable", "headerCheckboxable", "headerClass", "cellClass", "isTreeColumn", "treeLevelIndent", "summaryFunc", "summaryTemplate", "cellTemplate", "headerTemplate", "treeToggleTemplate", "ghostCellTemplate"] }, { kind: "directive", type: i3.DataTableColumnCellDirective, selector: "[ngx-datatable-cell-template]" }, { kind: "directive", type: NgxDatatableDefaultDirective, selector: "ngx-datatable[default]", inputs: ["class"], exportAs: ["ngxDatatableDefault"] }, { kind: "directive", type: NgxDatatableListDirective, selector: "ngx-datatable[list]", inputs: ["list"], exportAs: ["ngxDatatableList"] }, { kind: "directive", type: PermissionDirective, selector: "[abpPermission]", inputs: ["abpPermission", "abpPermissionRunChangeDetection"] }, { kind: "component", type: PageComponent, selector: "abp-page", inputs: ["title", "toolbar", "breadcrumb"] }, { kind: "component", type: PageToolbarContainerComponent, selector: "abp-page-toolbar-container" }, { kind: "component", type: AdvancedEntityFiltersComponent, selector: "abp-advanced-entity-filters", inputs: ["list", "localizationSourceName", "entityFilterPlaceholder"] }, { kind: "component", type: AdvancedEntityFiltersFormComponent, selector: "abp-advanced-entity-filters-form" }, { kind: "pipe", type: LocalizationPipe, name: "abpLocalization" }], changeDetection: i0.ChangeDetectionStrategy.Default, deferBlockDependencies: [() => [import('./m-oD-training-fruit-detail.component-D4ug2gMX.mjs').then(m => m.FruitDetailModalComponent)]] }); }
}
i0.ɵɵngDeclareClassMetadataAsync({ minVersion: "18.0.0", version: "21.0.9", ngImport: i0, type: FruitComponent, resolveDeferredDeps: () => [import('./m-oD-training-fruit-detail.component-D4ug2gMX.mjs').then(m => m.FruitDetailModalComponent)], resolveMetadata: FruitDetailModalComponent => ({ decorators: [{
                type: Component,
                args: [{ selector: 'lib-fruit', changeDetection: ChangeDetectionStrategy.Default, imports: [
                            ...ChildTabDependencies,
                            NgbCollapseModule,
                            NgbDatepickerModule,
                            NgbTimepickerModule,
                            NgbDropdownModule,
                            NgxValidateCoreModule,
                            CommonModule,
                            FormsModule,
                            ReactiveFormsModule,
                            NgxDatatableModule,
                            NgxDatatableDefaultDirective,
                            NgxDatatableListDirective,
                            PermissionDirective,
                            LocalizationPipe,
                            PageComponent,
                            PageToolbarContainerComponent,
                            AdvancedEntityFiltersComponent,
                            AdvancedEntityFiltersFormComponent,
                            FruitDetailModalComponent,
                            ...ChildComponentDependencies,
                        ], providers: [
                            ListService,
                            FruitViewService,
                            FruitDetailViewService,
                            { provide: NgbDateAdapter, useClass: DateAdapter },
                            { provide: NgbTimeAdapter, useClass: TimeAdapter },
                        ], template: "<abp-page [title]=\"title | abpLocalization\">\n  <abp-page-toolbar-container class=\"col\">\n    <!--<suite-custom-code-block-0>-->\n    <!--</suite-custom-code-block-0>-->\n    <div class=\"text-lg-end pt-2\">\n      <!--<suite-custom-code-block-1>-->\n      <!--</suite-custom-code-block-1>-->\n\n      <button\n        *abpPermission=\"'Training.Fruits.Create'\"\n        class=\"btn btn-primary btn-sm\"\n        type=\"button\"\n        (click)=\"create()\"\n      >\n        <i class=\"fa fa-plus me-1\" aria-hidden=\"true\"></i>\n        {{ 'Training::NewFruit' | abpLocalization }}\n      </button>\n      <!--<suite-custom-code-block-2>-->\n      <!--</suite-custom-code-block-2>-->\n    </div>\n  </abp-page-toolbar-container>\n\n  <abp-advanced-entity-filters localizationSourceName=\"Training\" [list]=\"list\">\n    @if (service.filters; as filters) {\n      <abp-advanced-entity-filters-form>\n        <form #filterForm (keyup.enter)=\"list.get()\">\n          <!--<suite-custom-code-block-3>-->\n          <!--</suite-custom-code-block-3>-->\n          <div class=\"row\">\n            <div class=\"col-12 col-sm-auto\">\n              <div class=\"mb-3\">\n                <label class=\"form-label\" for=\"nameArFilter\">\n                  {{ 'Training::NameAr' | abpLocalization }}\n                </label>\n\n                <input\n                  id=\"nameArFilter\"\n                  class=\"form-control\"\n                  [(ngModel)]=\"filters.nameAr\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                />\n              </div>\n            </div>\n\n            <div class=\"col-12 col-sm-auto align-self-end mb-3\">\n              <div class=\"row\">\n                <div class=\"col-6 col-sm-auto d-grid\">\n                  <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"clearFilters()\">\n                    <span>{{ 'AbpUi::Clear' | abpLocalization }}</span>\n                  </button>\n                </div>\n                <div class=\"col-6 col-sm-auto d-grid\">\n                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"list.get()\">\n                    <span>{{ 'AbpUi::Refresh' | abpLocalization }}</span>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n          <!--<suite-custom-code-block-4>-->\n          <!--</suite-custom-code-block-4>-->\n        </form>\n      </abp-advanced-entity-filters-form>\n    }\n  </abp-advanced-entity-filters>\n  <!--<suite-custom-code-block-5>-->\n  <!--</suite-custom-code-block-5>-->\n  <div class=\"card\">\n    <!--<suite-custom-code-block-6>-->\n    <!--</suite-custom-code-block-6>-->\n    <div class=\"card-body\">\n      <!--<suite-custom-code-block-7>-->\n      <!--</suite-custom-code-block-7>-->\n      <ngx-datatable\n        default\n        [rows]=\"service.data.items\"\n        [count]=\"service.data.totalCount\"\n        [list]=\"list\"\n      >\n        <!--<suite-custom-code-block-8>-->\n        <!--</suite-custom-code-block-8>-->\n\n        @if (isActionButtonVisible) {\n          <ngx-datatable-column\n            [name]=\"'AbpUi::Actions' | abpLocalization\"\n            [maxWidth]=\"150\"\n            [width]=\"150\"\n            [sortable]=\"false\"\n          >\n            <ng-template let-row=\"row\" let-i=\"rowIndex\" ngx-datatable-cell-template>\n              <div ngbDropdown container=\"body\" class=\"d-inline-block\">\n                <button\n                  class=\"btn btn-primary btn-sm dropdown-toggle\"\n                  data-toggle=\"dropdown\"\n                  aria-haspopup=\"true\"\n                  ngbDropdownToggle\n                >\n                  <i class=\"fa fa-cog me-1\" aria-hidden=\"true\"></i>\n                  {{ 'AbpUi::Actions' | abpLocalization }}\n                </button>\n\n                <div ngbDropdownMenu>\n                  <button\n                    ngbDropdownItem\n                    *abpPermission=\"'Training.Fruits.Edit'\"\n                    (click)=\"update(row)\"\n                  >\n                    {{ 'AbpUi::Edit' | abpLocalization }}\n                  </button>\n\n                  <button\n                    ngbDropdownItem\n                    *abpPermission=\"'Training.Fruits.Delete'\"\n                    (click)=\"delete(row)\"\n                  >\n                    {{ 'AbpUi::Delete' | abpLocalization }}\n                  </button>\n                </div>\n              </div>\n            </ng-template>\n          </ngx-datatable-column>\n        }\n        <ngx-datatable-column name=\"{{ 'Training::NameAr' | abpLocalization }}\" prop=\"nameAr\">\n          <ng-template let-row=\"row\" ngx-datatable-cell-template>\n            {{ row.nameAr }}\n          </ng-template>\n        </ngx-datatable-column>\n        <!--<suite-custom-code-block-9>-->\n        <!--</suite-custom-code-block-9>-->\n      </ngx-datatable>\n      <!--<suite-custom-code-block-10>-->\n      <!--</suite-custom-code-block-10>-->\n    </div>\n  </div>\n  <!--<suite-custom-code-block-11>-->\n  <!--</suite-custom-code-block-11>-->\n</abp-page>\n<!--<suite-custom-code-block-12>-->\n<!--</suite-custom-code-block-12>-->\n\n@defer (when serviceDetail.isVisible) {\n  @if (serviceDetail.isVisible) {\n    <lib-fruit-detail-modal />\n  }\n}\n", styles: ["::ng-deep .datatable-row-detail{background:transparent!important}\n"] }]
            }], ctorParameters: null, propDecorators: null }) });

var fruit_component = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FruitComponent: FruitComponent
});

export { FruitDetailViewService as F, fruit_component as f };
//# sourceMappingURL=m-oD-training-fruit.component-DlNISS6W.mjs.map
