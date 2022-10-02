import {
  Tabulator,
  AjaxModule,
  FilterModule,
  EditModule,
  SortModule,
  PopupModule,
  FormatModule,
} from "../lib/tabulator_esm.min.js";

try {
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
  const r = await (await fetch(params.data)).json();

  new Tabulator(".table", {
    height: "100vw",
    columns: Object.entries(columns).map(([name, cfgs]) => ({
      title: cfgs.title || name,
      field: name,

      headerFilter: cfgs?.filter?.type,
      headerFilterParams: cfgs?.filter?.params,

      sorter: cfgs?.sorter?.type,
      sorterParams: cfgs?.sorter?.params,
      headerSort: cfgs?.sorter?.enable || false,
      headerSortTristate: true,

      clickPopup: cfgs?.popup?.enable
        ? (event, component, onRendered) => component.getInitialValue()
        : undefined,
      formatter: cfgs?.popup?.enable
        ? (cell, params, onRendered) =>
            cell
              .getValue()
              .split(cfgs?.popup?.delimiter || " ")
              .slice(0, cfgs?.popup?.count || 8)
              .join(cfgs?.popup?.delimiter || " ")
        : cfgs?.format,
    })),
    ajaxURL: params.data,
  });
} catch (error) {
  document.querySelector(".error").innerText = error.stack;
  console.log(error.stack);
}
