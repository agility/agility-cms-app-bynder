"use client"

import dynamic from "next/dynamic"

const BynderAssetSelector = dynamic(() => import("../../../components/AssetSelector"), { ssr: false })

export default function Page() {
	return <BynderAssetSelector />
}