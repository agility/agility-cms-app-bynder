import {contentItemMethods, openModal, useAgilityAppSDK, useResizeHeight} from "@agility/app-sdk"
import {useMemo} from "react"
import EmptySection from "./EmptySection"
import AttachmentOverlay from "./AttachmentOverlay"
import Metadata from "./Metadata"
import {IconBuildingStore, IconPhoto, IconPhotoOff} from "@tabler/icons-react"
import {Button} from "@agility/plenum-ui"
import FieldHeader from "./FieldHeader"

export default function BynderImageField() {
	const {initializing, appInstallContext, field, fieldValue} = useAgilityAppSDK()

	const ref = useResizeHeight()

	const attachment = useMemo(() => {
		try {
			return JSON.parse(fieldValue)
		} catch (e) {
			return null
		}
	}, [fieldValue])

	const setAltText = (alt: string) => {
		if (!attachment) return
		attachment.alt = alt

		const assetStr = JSON.stringify(attachment)
		contentItemMethods.setFieldValue({value: assetStr})

	}
	//TODO: add readonly props....
	const selectImage = () => {
		openModal<any | null>({
			title: "Select an Image",
			name: "bynder-asset-selector",
			props: {
				assetType: "IMAGE",
			},
			callback: (result: any | null | undefined) => {
				if (!result) {
					return
				}
				const assetStr = JSON.stringify(result)
				contentItemMethods.setFieldValue({value: assetStr})
			},
		})
	}

	if (initializing) return <div></div>

	return (
		<div ref={ref}>
			{attachment && (
				<>
					<FieldHeader
						fieldConfig={{readOnly: false}}
						attachment={attachment}
						handleRemove={() => {
							contentItemMethods.setFieldValue({value: ""})
						}}
						handleSelect={() => selectImage()}
					/>
					<div className="mt-2 flex w-full flex-row flex-wrap rounded border border-gray-300">
						<div
							className={`relative flex h-[270px] xs:w-full sm:w-[275px]`}
							style={{
								background: "repeating-conic-gradient(#D9D9D9 0% 25%, transparent 0% 50%) 50% / 20px 20px",
							}}
						>
							<div
								className={
									"mx-auto flex h-full w-full max-w-[275px] items-center justify-center border-0 bg-contain bg-clip-border bg-center bg-no-repeat"
								}
								style={{
									backgroundImage: `url(${attachment?.derivatives?.thumbnail || attachment?.url})`,
								}}
							></div>
							<AttachmentOverlay isImage={true} />
							<i className="fa fa-picture-o" aria-hidden="true"></i>
						</div>
						<Metadata attachment={attachment} isReadonly={false} handleAltTextChange={setAltText} isImage={true} />
					</div>
				</>
			)}
			{!attachment && (
				<div>
					<EmptySection
						{...{
							messageHeading: "No Image Attached",
							messageBody: "Click to select an image.",
							icon: <IconPhotoOff className="text-gray-400 h-12 w-12" stroke={1} />,
							buttonComponent: <Button type="alternative" onClick={() => selectImage()} label="Browse" />,
						}}
					/>
				</div>
			)}
		</div>
	)
}
