// prettier-ignore
import {
  // Core
  LitElement, html, css,
  // Statics
  literal, staticHtml,
  // Directives
  ifDefined, when, styleMap
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

/*
  ┳┳ •┓• •
  ┃┃╋┓┃┓╋┓┏┓┏
  ┗┛┗┗┗┗┗┗┗ ┛

*/

function queryComponentSlots(slot = undefined) {
  return this
    .shadowRoot
    .querySelector(`slot${slot !== undefined ? `[name=${slot}]` : ":not([name])"}`);
}

function appendSlotAssignedNodes(slot, ...nodes) {
  slot.assign(...slot.assignedNodes(), ...nodes);
  return slot;
}

/*
  ┓ •    ┏┓
  ┃ ┓┏╋  ┃ ┏┓┏┳┓┏┓┏┓┏┓┏┓┏┓╋
  ┗┛┗┛┗  ┗┛┗┛┛┗┗┣┛┗┛┛┗┗ ┛┗┗
                ┛
*/

class WaveList extends LitElement {
  static shadowRootOptions = { ...LitElement.shadowRootOptions, slotAssignment: "manual" };

  static properties = {
    width: { type: Number },
    manualLineBreak: { attribute: "manuallinebreak", type: Boolean }
  };

  static styles = css`
    .wrapper {
      width: 50%;
      height: 100%;
    }

    ul {
      width: 100%;
      padding: 0;
      margin: 0;
    }
  `;

  queryComponentSlots = queryComponentSlots.bind(this);

  constructor() {
    super();

    this.manualLineBreak = false;
    this.width = "70";
  }

  firstUpdated() {
    Array.from(this.children).forEach(e =>
      appendSlotAssignedNodes(this.queryComponentSlots(
        e.tagName.toLowerCase() === "list-title" ? "title" : "list"
      ), e));
  }

  render() {
  	return html`
  	  <div class="wrapper" style=${ifDefined(when(this.manualLineBreak, () => styleMap({ width: "fit-content" })))}>
  	  	<div style=${styleMap({ width: when(this.manualLineBreak, () => "auto", () => `${this.width}%`) })}">
            <slot name="title"></slot>
            <h3>line break status: ${this.manualLineBreak}</h3>
            <ul>
              <slot name="list"></slot>
            </ul>
  	  	</div>
  	  </div>
  	`
  }
}

/*
  ┳         ┏┓
  ┃╋┏┓┏┳┓┏  ┃ ┏┓┏┳┓┏┓┏┓┏┓┏┓┏┓╋┏
  ┻┗┗ ┛┗┗┛  ┗┛┗┛┛┗┗┣┛┗┛┛┗┗ ┛┗┗┛
                   ┛
*/

const ItemBase = (tag, { color = "blue", width = 100 } = {}) => Parent => class extends Parent {
  static properties = {
    color: { type: String },
    width: { type: null, converter: val => `${val}%` }
  };

  constructor() {
    super();

    this.color = color;
    this.width = width;
  }

  render() {
    return staticHtml`
      <${tag} style="${styleMap({
        backgroundColor: this.color,
        width: `${this.width}`
      })}">
        <slot></slot>
      </${tag}>
    `;
  }
}


class WaveListTitle extends ItemBase(literal`div`, { width: 65 })(LitElement) {
  static styles = css`
    div slot {
      align-items: center;
      display: flex;
      font-size: 1.5em;
      height: 2.25em;
      justify-content: left;
      position: relative;

      &::before,
      &::after {
        bottom: auto;
        content: "";
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }

      &::before {
        background-image: radial-gradient(circle at 10px 15px, transparent 12px, white 13px);
        background-size: 20px 20px;
        height: 0.4em;
      }

      &::after {
        background-image: radial-gradient(circle at 10px 0px, white 12px, transparent 13px);
        background-size: 40px 20px;
        height: 0.6em;
      }
    }
  `;
}

class WaveListItem extends ItemBase(literal`li`, { width: "auto" })(LitElement) {
  static styles = css`
    li {
      padding: 0.35em;
      margin: 0;
      list-style: none;
    }
  `;
}

/*
  ┳  • •┓•    •
  ┃┏┓┓╋┓┃┓┓┏┓╋┓┏┓┏┓
  ┻┛┗┗┗┗┗┗┗┗┻┗┗┗┛┛┗

*/

customElements.define("wave-list", WaveList);
customElements.define("list-title", WaveListTitle);
customElements.define("list-item", WaveListItem);