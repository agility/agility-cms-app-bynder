"use client"
import {useAgilityAppSDK, closeModal} from "@agility/app-sdk"
import {CompactView, Login, assetType} from "@bynder/compact-view"
import {useMemo} from "react"

const assetFieldSelection = `
  name
  url
  originalUrl
  derivatives {
    thumbnail
    webImage
  }
  ... on Video {
    previewUrls
  }
`

export default function BynderAssetSelector() {
	const {initializing, appInstallContext, modalProps} = useAgilityAppSDK()

	const config = appInstallContext?.configuration

	const bynderUrl = useMemo(() => {
		return config?.bynderurl
	}, [config])

	if (initializing) {
		return null
	}

	if (!bynderUrl) {
		return <div>Please ensure this app has been properly configured.</div>
	}

	const assetType = modalProps?.assetType || "IMAGE"

	return (
		<div id="media-container" className="flex flex-col h-full min-h-0">
			<div className="relative flex-1 overflow-hidden">
				<Login
					portal={{
						url: bynderUrl,
						editable: false,
					}}
				>
					<CompactView
						mode="SingleSelect"
						language="en_US"
						assetTypes={assetType && [assetType]}
						isContainerMode
						onSuccess={(assets) => {
							const [asset] = assets
							closeModal(asset)
						}}
						assetFieldSelection={assetFieldSelection}
					/>
				</Login>
			</div>
		</div>
	)
}
