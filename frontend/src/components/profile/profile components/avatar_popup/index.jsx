import {FileUpload, ImageWrapper, UpdateButton, UpdateUserImage} from "./styled";
import RemoveBin from "../../../../assets/remove.png"
import UploadArrow from "../../../../assets/upload_arrow.svg"

const AvatarPopUp = (props) => {
    return (
        <UpdateUserImage display={props.editAvatar}>
            <UpdateButton id={"avatar"}>
              <ImageWrapper src={UploadArrow}/>
              <label className="custom-file-upload">
                <FileUpload
                  name="avatar"
                  type="file"
                  accept="image/png, image/jpg"
                  ref={props.avatarRef}
                />
                Upload
              </label>
            </UpdateButton>
            <UpdateButton name="remove">
              <ImageWrapper src={RemoveBin}/>
                Remove
            </UpdateButton>
        </UpdateUserImage>
    )
}

export default AvatarPopUp;