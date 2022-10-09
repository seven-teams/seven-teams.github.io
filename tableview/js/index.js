import {
  Tabulator,
  AjaxModule,
  FilterModule,
  EditModule,
  SortModule,
  PopupModule,
  FormatModule,
  MenuModule,
} from "https://unpkg.com/tabulator-tables/dist/js/tabulator_esm.min.js";

try {
  function removeUndefined(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, val]) => val !== undefined)
    );
  }

  const showColDiv = document.querySelector(".show");
  function createShowButton(column) {
    let showButton = document.createElement("button");
    showButton.innerText = column.getDefinition().title;
    showButton.addEventListener("click", (evt) => {
      column.show();
      showButton.remove();
    });
    showColDiv.appendChild(showButton);
  }

  Tabulator.registerModule([
    AjaxModule,
    FilterModule,
    EditModule,
    SortModule,
    FormatModule,
    PopupModule,
    MenuModule,
  ]);

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, query) => searchParams.get(query),
  });

  const columns = await (await fetch(params.columns)).json();
  const tab = new Tabulator(".table", {
    // height: document.documentElement.clientHeight,
    columns: Object.entries(columns).map(([name, cfgs]) =>
      removeUndefined({
        title: cfgs.title || name,
        field: name,

        headerFilter: cfgs?.filter?.type,
        headerFilterParams: cfgs?.filter?.params,

        sorter: cfgs?.sorter?.type,
        sorterParams: cfgs?.sorter?.params,
        headerSort: cfgs?.sorter?.enable || false,
        headerSortTristate: true,

        visible: cfgs?.visiblity,

        clickPopup:
          cfgs?.popup?.enable &&
          ((event, component, onRendered) => component.getInitialValue()),
        formatter: cfgs?.popup?.enable
          ? (cell, params, onRendered) =>
              cell
                .getValue()
                .split(cfgs?.popup?.delimiter || " ")
                .slice(0, cfgs?.popup?.count || 8)
                .join(cfgs?.popup?.delimiter || " ")
          : cfgs?.format,
        formatterParams:
          cfgs?.format === "link" && cfgs?.formatParams?.labelField
            ? {
                ...cfgs?.formatParams,
                labelField: undefined,
                label: (cell) =>
                  cell
                    .getRow()
                    .getCell(cfgs.formatParams.labelField)
                    .getValue() || cell.getValue(),
              }
            : cfgs?.formatParams,

        headerMenu: cfgs?.menu && [
          cfgs?.menu?.hideable && {
            label: "Hide Column",
            action: (evt, column) => {
              column.hide();
              createShowButton(column);
            },
          },
        ],
        headerMenuIcon: cfgs?.menu && `<span style="line-height: 1em">☰</span>`,
      })
    ),
    ajaxURL: params.data,
    // data: await (await fetch(params.data)).json(),
  });

  tab.on("tableBuilt", () => console.log(tab.getColumnDefinitions()));
} catch (error) {
  document.querySelector(".error").innerText = error.stack;
  console.log(error.stack);
}
