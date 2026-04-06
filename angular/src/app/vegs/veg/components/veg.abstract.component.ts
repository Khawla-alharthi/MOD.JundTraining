import { Directive, OnInit, inject } from '@angular/core';

import { ListService, PermissionService } from '@abp/ng.core';

import type { VegDto } from '../../../proxy/vegs/models';
import { VegViewService } from '../services/veg.service';
import { VegDetailViewService } from '../services/veg-detail.service';

export const ChildTabDependencies = [];

export const ChildComponentDependencies = [];

@Directive()
export abstract class AbstractVegComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly service = inject(VegViewService);
  public readonly serviceDetail = inject(VegDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::Vegs';
  protected isActionButtonVisible: boolean | null = null;

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

  update(record: VegDto) {
    this.serviceDetail.update(record);
  }

  delete(record: VegDto) {
    this.service.delete(record);
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('Jund.Vegs.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('Jund.Vegs.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
