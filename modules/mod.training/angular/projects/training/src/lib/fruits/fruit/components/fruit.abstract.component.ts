import { Directive, OnInit, inject } from '@angular/core';

import { ListService, PermissionService } from '@abp/ng.core';

import type { FruitDto } from '../../../proxy/fruits/models';
import { FruitViewService } from '../services/fruit.service';
import { FruitDetailViewService } from '../services/fruit-detail.service';

export const ChildTabDependencies = [];

export const ChildComponentDependencies = [];

@Directive()
export abstract class AbstractFruitComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly service = inject(FruitViewService);
  public readonly serviceDetail = inject(FruitDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = 'Training::Fruits';
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

  update(record: FruitDto) {
    this.serviceDetail.update(record);
  }

  delete(record: FruitDto) {
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
}
