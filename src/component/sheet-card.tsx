import Image from "next/image";

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
    <div>
      <Image
        className="bg-white w-50"
        src={`/thumbnail/${name}.svg`}
        width={100}
        height={100}
        alt=""
      />
      <span>
        <a href={`/sheet/${name}.pdf`} download>
          <button type="button">Download</button>
        </a>
        <button type="button" onClick={printFile}>
          Print
        </button>
      </span>
    </div>
  );
}
