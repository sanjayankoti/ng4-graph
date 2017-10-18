import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
declare var window: any;

@Component({
  selector: 'graph-component',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements AfterViewInit {
  @ViewChild('graphCanvas', { read: ElementRef }) graphCanvas: ElementRef;
  freqVal: number = 186;
  qVal: number = 0.48906580683982775;
  gainVal: number = 0.7199000039999994;

  constructor() {
    window.self = {
      peaks: [[20, 1, 0], [20, 0.20222840258882313, -3.246930424000002], [186, 0.48906580683982775, 0.7199000039999994], [899, 0.1919914322977212, -0.29143898000000235], [22050, 0.2909137653414761, 1.6029143879999985]],
      w: 800,
      h: 600,
      y: 20,
      x: 30,
      ctx: null,
      canvas: null,
      RATE: 48E3,
      bands: 5,
      tn: 0,
      pressed: !1,
      dragging: !1,
      touchRadius: 32,
      mode: 2,
      cachedBg: null,
      elements: [],
      colors: ["#2D5EAA", "#2c8f29", "#b23535", "#752E99", "#C7AB35"],
      color: { "bg": "#16181C", "botBG": "#242424", "buttonsBG": "#919497", "tabStroke": "#535457", "masterLabel": "#ECCA12", "stripChLabel": "#C4C4C4", "labelText": "#F9F9F9", "labelTextSel": "#F9F9F9", "eqLabel": "#EEEEEE", "tabText": "#C8C9C9", "tabTextSel": "#f9f9f9", "vuBg": "#5E6168", "ledText": "#00ffff", "mLedText": "#E7E840", "eqBg": "#18191D", "eqBg2": "#18191D", "graphMarks": "#8D8E90", "yellow": "#BCA633", "red": "#A83B3B", "blue": "#3576B1", "brown": "#B28741", "green": "#47AF46", "purple": "#8835b1", "orange": "#b27635", "gray": "#B0AFAF", "black": "#060606", "sub": "#ba5d81", "modal": "#32ABBE", "media": "#A8184B", "white": "#f9f9f9", "presetBg": "#232627", "shadow": "#444", "maxx": "#AB9A89", "tvPhantom": "#3577b1", "tvInvert": "#b37936", "tvMute": "#b53636", "tvMuteMG": "#e55", "tvMuteUn": "#82C9DE", "tvSolo": "#c3a72d", "tvGray": "#555", "tvClearSolo": "#ccaf2f", "tvMuteALL": "#ba3838", "tvMuteFX": "#387dba", "tvInvertOff": "#4D4D5D", "tvPhantomOff": "#4D4D5D", "tvMuteOff": "#807B7B", "tvSoloOff": "#80807B", "EQ": "#A83B3B", "DYN": "#47AF46", "FX": "#3576B1", "AUX": "#BCA633", "MATRIX": "#b27635", "LINEIN": "#BC2D1B", "DIGI": "#bbb", "INPUT": "#c4673a", "vuPeak": "#b4b", "grad1": {}, "grad2": {}, "grad3": {}, "grad4": {}, "grad5": {}, "grad6": {}, "gradMBL": {}, "panGrad": {}, "mPanGrad": {}, "gradTVInd": null, "longClickMark": "rgba(100,100,100,0.5)", "me": "#FF9900", "GATE": "#6D9F36", "USB": "#C35353", "LOCAL": "#D08561", "SD": "#BCA633", "afsFixed": "#3333bb", "afsLive": "#DBD23C", "afsGraphPeakFixed": "rgba(51,51,187,0.6)", "afsGraphPeakLive": "rgba(219,210,60,0.6)", "tvvuGrad": {}, "tvvuGrad2": {}, "stripGrad": {}, "grpeak": {} },
      initEvents: this.initEvents,
      getValues: this.getValues,
      freqToX: this.freqToX,
      cachePaint: this.cachePaint,
      designHP: this.designHP,
      designPeak: this.designPeak,
      bound: this.bound,
      hexToRGBA: this.hexToRGBA,
      DeesserVtoFREQ: this.DeesserVtoFREQ,
      VtoFREQ: this.VtoFREQ,
      VtoEQGAIN20: this.VtoEQGAIN20,
      paint: this.paint,
      isIntersect: this.isIntersect,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
      FREQtoX: this.FREQtoX,
      paintBackground: this.paintBackground,
      paintMarks: this.paintMarks,
      setShadow: this.setShadow
    };
  }

  public ngAfterViewInit() {
    console.log('this.graphCanvas.nativeElement', this.graphCanvas.nativeElement);
    window.self.canvas = this.graphCanvas.nativeElement;
    window.self.ctx = window.self.canvas.getContext('2d');
    console.log('window.self.ctx', window.self.ctx);
    window.self.initEvents();
  }

  private initEvents() {
    // window.self.canvas.addEventListener('mousedown', window.self.onMouseDown, !1);
    window.addEventListener('mousemove', window.self.onMouseMove, !1);
    window.addEventListener('mouseup', window.self.onMouseUp, !1);
    window.self.paintBackground();
    window.self.paint();
  }

  private getValues() {
    console.log('getValues...');
  }

  private freqToX(a) {
    return (window.self.w - 1) * Math.log(a / 20) / Math.log(1102.5);
  }

  private cachePaint() {
    console.log('cachePaint...');
    let grd: any;
    window.self.cachedBg = document.createElement("canvas");
    let a = window.self.cachedBg.getContext("2d");
    window.self.cachedBg.width = 2 * window.self.w, window.self.cachedBg.height = 2 * window.self.h, a.scale(2, 2);
    var b = window.self.w,
      c = window.self.h,
      d = .5 * c / 20,
      e = c / 2 | 0;
    a.fillStyle = "#0A0B0C";
    a.fillRect(0, 0, window.self.w, window.self.h);
    (a.fillStyle = grd, a.fillRect(0, 0, b, c));
    a.font = '12px open_sans_condensedbold';
    a.textAlign = "center";
    a.lineWidth = 1;
    a.fillStyle = "rgba(255,255,255,0.3)";
    a.fillRect(0, e - 1, b, 2);
    a.fillStyle = "rgba(255,255,255,0.1)";
    a.fillRect(0, e - 10 * d | 0, b, .5);
    a.fillRect(0, e + 10 * d | 0, b, .5);
    a.strokeStyle = "rgba(255,255,255,0.15)";
    a.lineWidth = .5;
    a.beginPath();
    a.moveTo(0, e - 1);
    a.lineTo(b, e - 1);
    a.fillStyle = window.self.color.labelText;
    for (b = 30; 100 >= b; b += 10) d = (window.self.freqToX(b) | 0) + .5, a.moveTo(d, 0), a.lineTo(d, c - 1);
    for (b = 100; 1E3 >= b; b += 100) d = (window.self.freqToX(b) | 0) + .5, a.moveTo(d, 0), a.lineTo(d, c - 1);
    for (b =
      1E3; 1E4 >= b; b += 1E3) d = (window.self.freqToX(b) | 0) + .5, a.moveTo(d, 0), a.lineTo(d, c - 1);
    a.stroke();
    let egrad = window.self.ctx.createLinearGradient(0, 0, window.self.w, 0);
    egrad.addColorStop(0, window.self.colors[1]);
    egrad.addColorStop(.5, window.self.colors[2]);
    egrad.addColorStop(1, window.self.colors[3]);
  }

  private designHP(a, b, c) {
    console.log('designHP...');
    if (20.1 > b) return [1, 0, 0, 1, 0, 0];
    a = 2 * Math.PI * b / a;
    b = Math.sin(a);
    a = Math.cos(a);
    var d = b / (2 * c);
    b = 1 + d;
    c = -(2 * a) / b;
    d = (1 - d) / b;
    b = Math.pow(10, 0) / b;
    return [.5 * (1 + a) * b, -(1 + a) * b, .5 * (1 + a) * b, 1, c, d];
  }

  private designPeak(a, b, c, d) {
    console.log('designPeak...');
    if (-.001 <= d && .001 >= d) return [1, 0, 0, 1, 0, 0];
    d = Math.pow(10, d / 40);
    b = 2 * Math.PI * b / a;
    a = Math.cos(b);
    c = b * (2 * Math.PI - b) / (c * (4 * Math.PI - b));
    var e = 1 + c / d;
    b = -(2 * a) / e;
    var f = (1 - c / d) / e,
      e = Math.pow(10, 0) / e;
    return [(1 + c * d) * e, -(2 * a) * e, (1 - c * d) * e, 1, b, f];
  }

  private bound(a, b, c) {
    console.log('bound...');
    return a < b ? b : a > c ? c : a;
  }

  private hexToRGBA(a, b) {
    console.log('hexToRGBA...');
    if (!a || "r" == a[0]) return a;
    a = a.replace("#", "");
    var c = window.self.bound(parseInt(a.substring(0, 2), 16), 0, 255),
      d = window.self.bound(parseInt(a.substring(2, 4), 16), 0, 255),
      e = window.self.bound(parseInt(a.substring(4, 6), 16), 0, 255),
      f = window.self.bound(b, 0, 1);
    return "rgba(" + c + "," + d + "," + e + "," + f + ")";
  }

  private DeesserVtoFREQ(a) {
    return 2E3 * Math.pow(7.5, a);
  }

  private VtoFREQ(a) {
    return Math.round(20 * Math.pow(1102.5, a));
  }

  private VtoEQGAIN20(a) {
    return 40 * a - 20;
  }

  private paint() {
    window.self.elements = [];
    window.self.cachePaint();
    window.self.ctx.drawImage(window.self.cachedBg, 0, 0, window.self.w, window.self.h);
    window.self.ctx.fillStyle = "rgba(255,255,255,0.04)";
    window.self.ctx.fillRect(0, 0, window.self.w, window.self.h);
    let a = window.self.w,
      b = window.self.h,
      c = window.self.peaks,
      d = .5 * b / 20,
      e = b / 2 | 0;

    window.self.freqPlot = Array(a);
    window.self.freqPlot2 = Array(a);
    window.self.xToFreq = Array(a);
    window.self.xToAngular = Array(a);
    window.self.xCos1 = Array(a);
    window.self.xCos2 = Array(a);
    for (let f = 0; f < a; f++) {
      let b = 20 * Math.pow(1102.5, 1 * f / a),
        g = 2 * b * Math.PI / window.self.RATE,
        h = Math.cos(g),
        k = Math.cos(2 * g);
      window.self.xToFreq[f] = b;
      window.self.xToAngular[f] = g;
      window.self.xCos1[f] = h;
      window.self.xCos2[f] = k;
    }

    let g: any;
    let f: any;
    let l: any;
    let m: any;
    let n: any;
    let p: any;
    let q: any;
    let k: any;
    let h: any;

    for (b = 0; b < a; b++) window.self.freqPlot[b] = 0, window.self.freqPlot2[b] = 0;
    for (b = 0; b < window.self.bands; b++)
      for (g = null, g = 0 == b ? window.self.designHP(window.self.RATE, window.self.bound(c[b][0], 20, 1E3), Math.sqrt(2) / 2) : window.self.designPeak(window.self.RATE, c[b][0], c[b][1], c[b][2]), f = g[3], l = g[0], n = g[1], m = g[2], p = g[4], h = g[5],
        g = l * l + n * n + m * m, n = 2 * n * (l + m), l = 2 * l * m, m = f * f + p * p + h * h, p = 2 * p * (f + h), q = 2 * f * h, f = 0; f < a; f++) h = window.self.xCos1[f], k = window.self.xCos2[f], h = 4.3429448190325175 * Math.log((g + n * h + l * k) / (m + p * h + q * k)), window.self.freqPlot[f] += h, b == window.self.mode && (window.self.freqPlot2[f] += h);
    window.self.ctx.lineWidth = 2;
    window.self.ctx.lineJoin = "round";
    window.self.showCurrentCurve = true;
    if (window.self.showCurrentCurve) {
      window.self.ctx.beginPath();
      for (f = 0; f < a; f++)
        if (!(1 == (f & 1) && f < a - 1) || window.self.freqPlot2[f] > window.self.freqPlot2[f - 1] && window.self.freqPlot2[f] > window.self.freqPlot2[f + 1] || window.self.freqPlot2[f] < window.self.freqPlot2[f - 1] && window.self.freqPlot2[f] < window.self.freqPlot2[f +
          1]) g = e - d * window.self.freqPlot2[f], 0 == f && window.self.ctx.moveTo(f, g), window.self.ctx.lineTo(f, g);
      window.self.ctx.lineWidth = 1;
      window.self.ctx.strokeStyle = window.self.colors[window.self.mode];
      window.self.ctx.fillStyle = window.self.hexToRGBA(window.self.colors[window.self.mode], .1);
      window.self.ctx.stroke();
      window.self.ctx.lineTo(a, e);
      window.self.ctx.lineTo(0, e);
      window.self.ctx.closePath();
      window.self.ctx.fill();
    }
    window.self.ctx.beginPath();
    window.self.ctx.fillStyle = "rgba(255,255,255,0.12)";
    window.self.ctx.strokeStyle = "#ffffff";
    window.self.ctx.lineWidth = 2;
    for (f = 0; f < a; f++)
      if (!(1 == (f & 1) && f < a - 1) || window.self.freqPlot[f] > window.self.freqPlot[f - 1] && window.self.freqPlot[f] > window.self.freqPlot[f + 1] || window.self.freqPlot[f] < window.self.freqPlot[f - 1] &&
        window.self.freqPlot[f] < window.self.freqPlot[f + 1]) g = e - d * window.self.freqPlot[f], 0 == f && window.self.ctx.moveTo(f, g), window.self.ctx.lineTo(f, g);
    window.self.ctx.stroke();
    window.self.ctx.lineTo(a, e);
    window.self.ctx.lineTo(0, e);
    window.self.ctx.closePath();
    window.self.ctx.fill();
    window.self.ctx.textAlign = "center";
    window.self.easy = window.self.bypass = false;
    if (window.self.easy) {
      for (window.self.ctx.strokeStyle = "rgba(255,255,255,0.5)", window.self.ctx.font = "bold 15px open_sans_condensedbold", l = ["B", "M", "T"], a = [1, 2, 3], n = 0; n < l.length; n++) b = a[n], f = window.self.freqToX(c[b][0]), 1 == b && (f += window.self.w / 6), 3 == b && (f -= window.self.w / 6), g = e - c[b][2] * d, window.self.ctx.lineWidth = "3", window.self.bypass && 0 != b ? (window.self.ctx.fillStyle = "rgba(255,255,255,0.4)", window.self.ctx.strokeStyle =
        "rgba(255,255,255,0.3)") : (window.self.ctx.fillStyle = window.self.colors[b], window.self.ctx.strokeStyle = window.self.colors[b]), window.self.ctx.globalAlpha = .9, window.self.ctx.beginPath(), window.self.ctx.arc(f, g, 16, 0, 2 * Math.PI), window.self.ctx.fill(), window.self.tx.globalAlpha = 1, window.self.ctx.beginPath(), window.self.ctx.arc(f, g, window.self.touchRadius, 0, 2 * Math.PI), window.self.ctx.globalAlpha = .38, window.self.ctx.fill(), window.self.ctx.globalAlpha = 1, window.self.mode == b && window.self.ctx.stroke(), window.self.ctx.fillStyle = "#060606", window.self.ctx.fillText(l[n], f - (0 == b ? 1 : 0) + 1, g + 5 + 1), window.self.ctx.fillStyle = "#F0F0F0", window.self.ctx.fillText(l[n], f - (0 == b ? 1 : 0), g + 5);
    } else {
      for (window.self.ctx.strokeStyle = "rgba(255,255,255,0.5)", window.self.ctx.font = "bold 14px open_sans_condensedbold", l = ["HPF", "1", "2", "3", "4"], b = 0; b < window.self.bands; b++) {
        if (f = window.self.freqToX(c[b][0]), g = e - c[b][2] * d, window.self.ctx.lineWidth = "3", window.self.bypass && 0 != b) {
          window.self.ctx.fillStyle = "rgba(255,255,255,0.4)";
          window.self.ctx.strokeStyle = "rgba(255,255,255,0.3)";
        } else {
          window.self.ctx.fillStyle = window.self.colors[b];
          window.self.ctx.strokeStyle = window.self.colors[b];
          window.self.ctx.globalAlpha = .9;
          window.self.ctx.beginPath();
          window.self.ctx.arc(f, g, 13, 0, 2 * Math.PI);
          window.self.ctx.fill();
          window.self.ctx.globalAlpha = 1;
          window.self.ctx.beginPath();
          window.self.ctx.arc(f, g, window.self.touchRadius, 0, 2 * Math.PI);
          window.self.ctx.globalAlpha = .38;
          window.self.ctx.fill();
          window.self.ctx.globalAlpha = 1;
          window.self.mode == b && window.self.ctx.stroke();
          window.self.ctx.fillStyle = "#060606";
          window.self.ctx.fillText(l[b], f + 1, g + 6);
          window.self.ctx.fillStyle = "#F0F0F0";
          window.self.ctx.fillText(l[b], f, g + 5);
          window.self.elements.push({ name: l[b], x: f + 24, y: g + 65, radius: window.self.touchRadius });
        }
      }
      console.log('elements', window.self.elements);
    }


    window.self.ctx.lineWidth = 1;
    window.self.ctx.strokeStyle = "#222";
    window.self.ctx.strokeRect(.5, .5, window.self.w - 1, window.self.h - 1);
    window.self.showPreset = true;
    window.self.showPreset && (window.self.ctx.textAlign = "left", window.self.ctx.fillStyle == 0 ? "#444" : window.self.color.red, window.self.ctx.font = "18px open_sans_condensedbold", window.self.ctx.fillText("", 4, 18));

    $("freqSlider").val(String(window.self.peaks[window.self.mode]).split(",")[0]);
    $("qSlider").val(String(window.self.peaks[window.self.mode]).split(",")[1]);
    $("gainSlider").val(String(window.self.peaks[window.self.mode]).split(",")[2]);
    window.self.paintMarks();
  }

  private isIntersect(point, element) {
    return Math.sqrt((point.x - element.x) ** 2 + (point.y - element.y) ** 2) < element.radius;
  }

  public onMouseDown(e) {
    console.log("onMouseDown...");
    const mousePoint = {
      x: e.clientX,
      y: e.clientY
    };
    window.self.elements.forEach(element => {
      if (window.self.isIntersect(mousePoint, element)) {
        console.log("Click on element...");
        window.self.mode = element.name === "HPF" ? 0 : element.name;
        $("freqSlider").val(String(window.self.peaks[window.self.mode]).split(",")[0]);
        $("qSlider").val(String(window.self.peaks[window.self.mode]).split(",")[1]);
        $("gainSlider").val(String(window.self.peaks[window.self.mode]).split(",")[2]);
        window.self.dragging = !0;
        window.self.paint();
      }
    });
  }

  private onMouseMove(e) {
    if (window.self.dragging) {
      console.log("onMouseMove...");
      let data = [];
      data = String(window.self.peaks[window.self.mode]).split(",");
      let a = window.self.bound(e.clientX - 24, 0, window.self.w);
      let b = window.self.bound(e.clientY - 80, 0, window.self.h);
      if (window.self.mode > 0) {
        data[0] = a / window.self.w;
        data[2] = 1 - b / window.self.h;
        window.self.peaks[window.self.mode] = [window.self.VtoFREQ(data[0]), Number(data[1]), window.self.VtoEQGAIN20(data[2])];
      } else {
        data[0] = window.self.bound(a / window.self.w, 0, .5588);
        window.self.peaks[window.self.mode] = [window.self.VtoFREQ(data[0]), Number(data[1]), Number(data[2])];
      }
      window.self.paint();
    }
  }

  private onMouseUp(e) {
    console.log("onMouseUp...");
    window.self.dragging = !1;
  }

  public onSliderInputEvent() {
    window.self.peaks[window.self.mode] = [this.freqVal, this.qVal, this.gainVal];
    window.self.paint();
  }

  private FREQtoX(a, b) {
    return (b - 1) * Math.log(a / 20) / Math.log(1102.5);
  }

  private paintBackground() {
    window.self.ctx.fillRect(0, window.self.y, window.self.w + window.self.x + 35, window.self.h + 40);
    window.self.ctx.translate(window.self.x, window.self.y);
  }

  private paintMarks() {
    window.self.ctx.textAlign = "center";
    var a = window.self.h,
      b = window.self.w,
      c = a / 4,
      d = a / 2 | 0,
      e = [50, 100, 200, 500, 1E3,
        2E3, 5E3, 1E4
      ],
      f = "50 100 200 500 1k 2k 5k 10k".split(" ");
    // Bottom Bar
    window.self.ctx.font = 'bold 11px open_sans_condensedbold';
    window.self.ctx.fillStyle = "#101115";
    window.self.ctx.fillRect(0, window.self.h, window.self.w + 35, 40);
    window.self.ctx.fillStyle = window.self.color.graphMarks;
    window.self.ctx.textAlign = "left";
    window.self.ctx.fillText("20", 0, a + 15);
    window.self.ctx.fillText("22k", b - 20, a + 15);
    window.self.ctx.textAlign = "center";
    for (c = 0; c < e.length; c++) window.self.ctx.fillText(f[c], window.self.FREQtoX(e[c], b), a + 15);
    // Left Bar
    var a = window.self.h,
      b = window.self.w,
      c = a / 4,
      d = a / 2 | 0;
    window.self.ctx.fillStyle = "#101115";
    window.self.ctx.fillRect(-30, -20, 30, window.self.h + 60);
    window.self.ctx.textAlign = "center";
    window.self.ctx.font = 'bold 11px open_sans_condensedbold';
    window.self.ctx.save();
    window.self.ctx.translate(window.self.x, window.self.y);
    window.self.ctx.fillStyle = window.self.color.graphMarks;
    window.self.ctx.textAlign = "right";
    window.self.ctx.fillText("+20", -35, -10);
    window.self.ctx.fillText("+10", -35, c - 15);
    window.self.ctx.fillText("0", -35, d - 15);
    window.self.ctx.fillText("-10", -35, 3 * c - 15);
    window.self.ctx.fillText("-20", -35, a - 20);
    // Top Bar
    window.self.ctx.fillStyle = "#101115";
    window.self.ctx.fillRect(-30, -40, window.self.w + 35, 20);
    // Right Bar
    window.self.ctx.fillStyle = "#101115";
    window.self.ctx.fillRect(window.self.w - 30, -20, 35, window.self.h);
    window.self.ctx.restore();
  }

  private setShadow(a, b, c, d) {
    CanvasRenderingContext2D.prototype.shadowColor = 'transparent';
  }
}
