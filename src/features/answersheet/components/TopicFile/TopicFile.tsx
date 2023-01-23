import { Document, pdfjs, Page } from "react-pdf/dist/esm/entry.vite";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import pdf from "~/assets/sample.pdf";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export function TopicFile() {
  return (
    <div className={"tw-w-full"}>
      {/*<Document*/}
      {/*  onLoadSuccess={(data) => console.log(data)}*/}
      {/*  file={pdf}*/}
      {/*  options={options}*/}
      {/*>*/}
      {/*  <Page scale={1.2} pageNumber={1} />*/}
      {/*  <Page scale={1.2} pageNumber={2} />*/}
      {/*</Document>*/}
      <iframe className={"tw-h-screen tw-w-full"} frameBorder={0} src={pdf} />
    </div>
  );
}
