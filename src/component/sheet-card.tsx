import { Download, Printer } from "lucide-react";
import Image from "next/image";
import IconButton from "@/component/ui/icon-button";

export default function SheetCard({ name }: { name: string }) {
  function printFile(): void {
    fetch(`/sheet/${name}.pdf`)
      .then((response) => response.blob())
      .then((blob) => {
        const dataURL = URL.createObjectURL(blob);
        const pdfWindow = window.open(dataURL);
        pdfWindow?.print();
      })
      .catch((error) => {
        console.error("Failed to fetch or print the PDF:", error);
      });
  }

  return (
    <div className="flex flex-col gap-2">
      <Image
        className="bg-white w-50 h-50"
        src={`/thumbnail/${name}.svg`}
        width={100}
        height={100}
        alt=""
      />
      <span className="flex flex-row gap-2">
        <a href={`/sheet/${name}.pdf`} download>
          <IconButton icon={Download} />
        </a>
        <IconButton icon={Printer} onClick={printFile} />
      </span>
    </div>
  );
}
