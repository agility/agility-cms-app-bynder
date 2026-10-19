import fileSizeFromBytes from "../utils/fileSizeFromBytes";
import { TextInput } from "@agility/plenum-ui";
import { MetaRow } from "./MetaRow";

interface Props {
  attachment: any;
  isReadonly: boolean;
  handleAltTextChange: any;
  isImage: any;
}

const Metadata = ({
  attachment,
  isReadonly,
  handleAltTextChange,
  isImage,
}: Props) => {
  // Whole assets carry their metadata under files.original; a selected file
  // (saved since images moved to SingleSelectFile) carries it at the top level.
  const isWholeAsset = !!attachment?.files;
  const orig = isWholeAsset ? attachment.files.original : attachment;
  const assetUrl: string =
    (isWholeAsset ? attachment.originalUrl : attachment?.url) || "";

  let fileName = assetUrl.split("?")[0];
  if (fileName.includes("/")) {
    fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
  }

  return (
    <div className="mx-6 w-full flex-1 font-muli bg-white min-w-[275px]">
      {isImage && (
        <TextInput
          type="text"
          label="Alt Text"
          placeholder="Enter alt text"
          className="form-control agility-attachment-alt"
          value={attachment?.alt || attachment?.name || ""}
          onChange={(val) => handleAltTextChange(val)}
          isReadonly={isReadonly}
        />
      )}

      <MetaRow label={"Size"} value={fileSizeFromBytes(orig?.fileSize)} />
      <>
        {orig?.width > 0 && <MetaRow label={"Width"} value={orig?.width} />}
        {orig?.height > 0 && <MetaRow label={"Height"} value={orig?.height} />}
      </>
      <MetaRow
        label={"URL"}
        className={"border-b-0 border-b-transparent"}
        value={
          <a
            className="block break-all text-purple-600 line-clamp-1 hover:underline"
            href={assetUrl || undefined}
            target="_blank"
            rel="noreferrer"
          >
            {fileName || "Asset URL"}
          </a>
        }
      />
    </div>
  );
};

export default Metadata;
