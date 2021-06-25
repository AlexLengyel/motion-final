import {FeedMain} from "./styled";
import {BannerIMG} from "../../profile components/banner/styled";
import testbanner from "../../../../assets/testbanner.jpg";
import {useDispatch, useSelector} from "react-redux";
import EditProfile from "../../profile components/editprofile";
import {useEffect} from "react";
import {fetchUserdata} from "../../../../Axios/fetches";

const EditProfilePage = () => {
    const userInfo = useSelector(state => state.userData);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserdata);
    }, [dispatch]);


    return (
        <FeedMain>
            <BannerIMG src={userInfo.banner ? userInfo.banner : testbanner} alt="banner" />
            <EditProfile data={userInfo}/>
        </FeedMain>
    )
}

export default EditProfilePage