import { inject } from '@angular/core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { filter, switchMap } from 'rxjs/operators';
import type { GetFruitsInput, FruitDto } from '../../../proxy/fruits/models';
import { FruitService } from '../../../proxy/fruits/fruit.service';

export abstract class AbstractFruitViewService {
  protected readonly proxyService = inject(FruitService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  data: PagedResultDto<FruitDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetFruitsInput;

  delete(record: FruitDto) {
    this.confirmationService
      .warn('Training::DeleteConfirmationMessage', 'Training::AreYouSure', {
        messageLocalizationParams: [],
      })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.id)),
      )
      .subscribe(this.list.get);
  }

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<FruitDto>) => {
      this.data = list;
    };

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetFruitsInput;
    this.list.get();
  }
}
