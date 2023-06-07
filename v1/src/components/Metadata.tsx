
import fileSizeFromBytes from "../utils/fileSizeFromBytes";
import { TextInput } from "@agility/plenum-ui";
import { MetaRow } from "./MetaRow";

interface Props {
	attachment: any
	isReadonly: boolean
	handleAltTextChange: any
	isImage: any
}

const Metadata = ({ attachment, isReadonly, handleAltTextChange, isImage }: Props) => {

	const orig = attachment && attachment.files ? attachment.files.original : null

	let fileName = attachment.originalUrl || ""
	if (fileName.includes("/")) {
		fileName = fileName.substring(fileName.lastIndexOf("/") + 1)
	}

	console.log("orig", orig)


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
						href={attachment.originalUrl}
						target="_blank"
						rel="noreferrer"
					>
						{fileName || "Asset URL"}
					</a>
				}
			/>
		</div>
	)
}

export default Metadata;
