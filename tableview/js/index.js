import {
  Tabulator,
  AjaxModule,
  FilterModule,
  EditModule,
  SortModule,
  PopupModule,
  FormatModule,
} from "../lib/tabulator_esm.min.js";

Tabulator.registerModule([
  AjaxModule,
  FilterModule,
  EditModule,
  SortModule,
  FormatModule,
  PopupModule,
]);

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, query) => searchParams.get(query),
});

const columns = await (await fetch(params.columns)).json();

new Tabulator(".table", {
  height: "100vw",
  columns: Object.entries(columns).map(([name, cfgs]) => ({
    title: cfgs.title || name,
    field: name,
    headerFilter: cfgs?.filter?.type,
    headerFilterParams: cfgs?.filter?.params,
    sorter: cfgs?.sorter?.type,
    sorterParams: cfgs?.sorter?.params,
    formatter: cfgs?.format,
    clickPopup: cfgs?.popup
      ? (event, component, onRendered) => component.getInitialValue()
      : undefined,
    formatter: cfgs?.popup
      ? (cell, params, onRendered) => cell.getValue().split(" ").slice(0, 8).join(" ")
      : undefined,
  })),
  ajaxURL: params.data,
});
