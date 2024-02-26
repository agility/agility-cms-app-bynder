import {
  contentItemMethods,
  openModal,
  useAgilityAppSDK,
  useResizeHeight,
} from "@agility/app-sdk";
import { useMemo } from "react";
import EmptySection from "./EmptySection";
import AttachmentOverlay from "./AttachmentOverlay";
import Metadata from "./Metadata";
import {
  IconBuildingStore,
  IconPhoto,
  IconPhotoOff,
  IconVideoOff,
} from "@tabler/icons-react";
import { Button } from "@agility/plenum-ui";
import FieldHeader from "./FieldHeader";

export default function BynderVideoField() {
  const { initializing, appInstallContext, field, fieldValue } =
    useAgilityAppSDK();

  const ref = useResizeHeight();

  const attachment = useMemo(() => {
    try {
      return JSON.parse(fieldValue);
    } catch (e) {
      return null;
    }
  }, [fieldValue]);

  const setAltText = (alt: string) => {
    //do nothing
  };
  //TODO: add readonly props....
  const selectImage = () => {
    openModal<any | null>({
      title: "Select a Video",
      name: "bynder-asset-selector",
      props: {
        assetType: "VIDEO",
      },
      callback: (result: any | null | undefined) => {
        if (!result) {
          return;
        }

        const assetStr = JSON.stringify(result);
        contentItemMethods.setFieldValue({ value: assetStr });
      },
    });
  };

  if (initializing) return <div></div>;

  return (
    <div ref={ref}>
      {attachment && (
        <>
          <FieldHeader
            fieldConfig={{ readOnly: false }}
            attachment={attachment}
            handleRemove={() => {
              contentItemMethods.setFieldValue({ value: "" });
            }}
            handleSelect={() => selectImage()}
          />
          <div className="mt-2 flex w-full flex-row flex-wrap rounded border border-gray-300">
            <div
              className={`relative flex h-[270px] xs:w-full sm:w-[275px]`}
              style={{
                background:
                  "repeating-conic-gradient(#D9D9D9 0% 25%, transparent 0% 50%) 50% / 20px 20px",
              }}
            >
              <video
                controls
                poster={attachment.files.thumbnail.url}
                className="border-[3px] transition-all border-gray-300  focus-within:border-purple-600 hover:border-purple-600 w-full"
              >
                <source src={attachment.previewUrls[0]} type="video/mp4" />
              </video>
              <AttachmentOverlay isImage={false} />
              <i className="fa fa-picture-o" aria-hidden="true"></i>
            </div>
            <Metadata
              attachment={attachment}
              isReadonly={false}
              handleAltTextChange={setAltText}
              isImage={false}
            />
          </div>
        </>
      )}
      {!attachment && (
        <div>
          <EmptySection
            {...{
              messageHeading: "No Video Attached",
              messageBody: "Click to select a video.",
              icon: (
                <IconVideoOff className="text-gray-400 h-12 w-12" stroke={1} />
              ),
              buttonComponent: (
                <Button
                  actionType="alternative"
                  onClick={() => selectImage()}
                  label="Browse"
                />
              ),
            }}
          />
        </div>
      )}
    </div>
  );
}
