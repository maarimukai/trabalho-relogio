const tpl = document.createElement("template");
tpl.innerHTML = `
<svg width="500" height="300">
    <g transform="translate(250, 150)" stroke="black" fill="none">
    <circle cx="0" cy="0" r="100" stroke-width="2" />
    ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
        .map((a) => `<path d="M 0 -95 v -5" stroke-width="2.5" transform="rotate(${a})"/>`)
        .join("\n")}
    ${[6, 36, 66, 96, 126, 156, 186, 216, 246, 276, 306, 336]
        .map((a) => `<path d="M 0 -95 v -5" stroke-width="1" transform="rotate(${a})"/>`)
        .join("\n")}
    ${[12, 42, 72, 102, 132, 162, 192, 222, 252, 282, 312, 342]
        .map((a) => `<path d="M 0 -95 v -5" stroke-width="1" transform="rotate(${a})"/>`)
        .join("\n")}
    ${[18, 48, 78, 108, 138, 168, 198, 228, 258, 288, 318, 348]
        .map((a) => `<path d="M 0 -95 v -5" stroke-width="1" transform="rotate(${a})"/>`)
        .join("\n")}
    ${[24, 54, 84, 114, 144, 174, 204, 234, 264, 294, 324, 354]
        .map((a) => `<path d="M 0 -95 v -5" stroke-width="1" transform="rotate(${a})"/>`)
        .join("\n")}

    <text x="-10" y="-75" style="fill: black; font-size: 20px">12</text>
    <text x="80" y="7" style="fill: black; font-size: 20px">3</text>
    <text x="-6" y="90" style="fill: black; font-size: 20px">6</text>
    <text x="-90" y="6" style="fill: black; font-size: 20px">9</text>

    <path id="ph" d="M 0 0 v -75" stroke-width="4" />
    <path id="pm" d="M 0 0 v -90" stroke-width="3" />
    <circle cx="0" cy="0" r="5" fill="black" stroke-width="2" />
    <path id="ps" d="M 0 0 v -97" stroke="red" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="2" fill="red" stroke="none" />
    </g>
</svg>
`;


class WcRelogio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        const tipo = this.getAttribute("tipo");
        if (tipo === "analogico") {
            this.shadowRoot.append(tpl.content.cloneNode(true));
            this.getHMSA();
            this.intervalId = setInterval(() => {
                this.getHMSA();
            }, 1000);
        } else {
            this.span = document.createElement("span");
            this.shadowRoot.append(this.span);
            this.getHMSD();
            this.intervalId = setInterval(() => {
                this.getHMSD();
            }, 1000);
        }
    }

    disconnectedCallback() {
        clearInterval(this.intervalId);
    }

    getHMSD() {
        const date = new Date();
        this.span.textContent = date.toLocaleTimeString();
    }

    getHMSA() {
        const date = new Date();
        const s = date.getSeconds();
        const m = date.getMinutes() + s / 60;
        const h = date.getHours() % 12 + m / 60;
        this.ponteiro("ps").setAttribute("transform", `rotate(${s * 360 / 60})`);
        this.ponteiro("pm").setAttribute("transform", `rotate(${m * 360 / 60})`);
        this.ponteiro("ph").setAttribute("transform", `rotate(${h * 360 / 12})`);
    }

    ponteiro(id) {
        return this.shadowRoot.getElementById(id);
    }
}


// function getHMSD() {
//     const dh = new Date();
//     const h = formatNumber(dh.getHours());
//     const m = formatNumber(dh.getMinutes());
//     const s = formatNumber(dh.getSeconds());
//     return `${h}:${m}:${s}`;
// }

// function formatNumber(n) {
//     return String(n).padStart(2, "0");
// }

customElements.define("wc-relogio", WcRelogio);