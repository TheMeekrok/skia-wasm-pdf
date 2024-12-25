"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadData = void 0;
var init = function () {
    // @ts-ignore
    CanvasKitInit().then(function (CanvasKit) {
        var surface = CanvasKit.MakeSWCanvasSurface("skia");
        var paint = new CanvasKit.Paint();
        paint.setStyle(CanvasKit.PaintStyle.Fill);
        paint.setAntiAlias(true);
        paint.setColor(CanvasKit.RED);
        var rect1 = CanvasKit.XYWHRect(100, 100, 100, 100);
        var rect2 = CanvasKit.XYWHRect(100, 300, 200, 200);
        var drawCanvas = function (canvas) {
            canvas.drawRect(rect1, paint);
            // canvas.drawRect(rect2, paint);
        };
        surface.drawOnce(drawCanvas);
        var stream = CanvasKit.createDynamicMemoryWStream();
        var document = CanvasKit.createPDFDocument(stream);
        var canvas = CanvasKit.beginDocumentPage(document, 800, 600);
        drawCanvas(canvas);
        CanvasKit.closeDocumentPage(document);
        var data = CanvasKit.detachStreamAsData(stream);
        (0, exports.downloadData)(data, "export.pdf");
    });
};
var downloadData = function (data, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    var blob = new Blob([data], { type: "application/pdf" });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};
exports.downloadData = downloadData;
init();
