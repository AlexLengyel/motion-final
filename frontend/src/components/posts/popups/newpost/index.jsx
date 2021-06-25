import { OuterPopup, InnerPopup, CloseButton } from './styled'
import close from '../../../../assets/posts/close.png'
import {NewPostButton, NewPostForm} from "../../styled";
import send from "../../../../assets/posts/send.svg";
import { useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Axios from "../../../../Axios";


const Popup = props => {
    const [images, setImages] = useState([]);
    const imageRef = useRef();
    const newPostRef = useRef();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);

    // saves uploaded images to the local state, so they can be rendered in the new post window
    const saveImages = () => {
        let imgArr = Array.from(imageRef.current.files);
        imgArr.forEach(file => {
            setImages(images => [...images, file]);
        });
    };

    // create Form Data, fetch data through Thunk, post ID is saved in Redux store - connect to function on line 64
    const submitNewPost = async dispatch => {
        const url = 'social/posts/'

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        let newForm = new FormData();
        images.map(image => newForm.append('images', image));
        newForm.append('content', newPostRef.current.value);
        // This logic is for post sharing. If the post is being shared, then props.id is true
        if (props.id) newForm.append('shared_from', props.id)


        const response = await Axios.post(url, newForm, config);
        console.log(response.data);
        const action = {
            type: 'NEW_POST',
            payload: response.data,
        };
        dispatch(action);
    };

    // dispatch the return of submitNewPost - empties images when the user closes the window without submitting a post
    const createPost = e => {
        e.preventDefault();
        dispatch(submitNewPost);
        setImages([]);
        props.close(false);
    };

    return (props.toggle) ? (
        <OuterPopup>
            <InnerPopup>
                <CloseButton onClick={() => {props.close(false); setImages([])}}><img src={close} alt='close'/></CloseButton>
                <NewPostForm onSubmit={createPost}>
                    <div className="subContainer">
                        <img className="profilepic" src={userData.avatar} alt="profile pic" />
                        <textarea className="textarea" placeholder={`What's on your mind, ${userData['first_name']}?`}
                                  ref={newPostRef}/>
                    </div>
                    <div id="subContainer">
                        {images ? images.map((image, index) => <img className="uploadedimg" key={index}
                                                                    src={URL.createObjectURL(image)} alt="attachment" />) : null}
                    </div>
                    <div className="subContainer bottom">
                        <input type="file" accept="image/png, image/jpeg" ref={imageRef} multiple onChange={saveImages} />
                        <NewPostButton type="submit">
                            <img src={send} />
                        </NewPostButton>
                    </div>
                </NewPostForm>
            </InnerPopup>
        </OuterPopup>
    ) : null;
}

export default Popup