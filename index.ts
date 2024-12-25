const init = () => {
  // @ts-ignore
  CanvasKitInit().then((CanvasKit) => {
    const surface = CanvasKit.MakeSWCanvasSurface("skia");

    const paint = new CanvasKit.Paint();
    paint.setStyle(CanvasKit.PaintStyle.Fill);
    paint.setAntiAlias(true);
    paint.setColor(CanvasKit.RED);

    const rect1 = CanvasKit.XYWHRect(100, 100, 100, 100);
    const rect2 = CanvasKit.XYWHRect(100, 300, 200, 200);

    const drawCanvas = (canvas: any) => {
      canvas.drawRect(rect1, paint);
      // canvas.drawRect(rect2, paint);
    };

    surface.drawOnce(drawCanvas);

    const stream = CanvasKit.createDynamicMemoryWStream();
    const document = CanvasKit.createPDFDocument(stream);
    const canvas = CanvasKit.beginDocumentPage(document, 800, 600);

    drawCanvas(canvas);

    CanvasKit.closeDocumentPage(document);

    const data = CanvasKit.detachStreamAsData(stream);
    downloadData(data, "export.pdf");
  });
};

export const downloadData = (data: any, fileName: string) => {
  var a = document.createElement("a");
  document.body.appendChild(a);
  const blob = new Blob([data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

init();
