import React, { useRef } from "react";
import styles from "./image_file_input.module.css";

const ImageFileInput = ({imageUploader, name, onFileChange}) => {
    const inputRef = useRef();
    const onButtonClick = (event) =>{
        event.preventDefault();
        inputRef.current.click();
    }

    const onChange = async event =>{
        console.log(event.target.files[0]);
        const uploaded = await imageUploader.upload(event.target.files[0]);
        console.log(uploaded);
        //파일 올리면 값을 받아온다.
        //onFileChange를 화면에서 보일 수 있게 하기 위해서 전달해줘야한다.
        onFileChange({
            name:uploaded.original_filename,
            url:uploaded.url
        })
    }
    
    return(
        <div className={styles.container}>
            <input 
            ref={inputRef} 
            className={styles.input} 
            type="file" 
            accept="image/*" 
            name="file"
            onChange={onChange} />
            <button className={styles.button} onClick={onButtonClick}>
                {name || 'No File'}
            </button>
        </div>
 
    )
    }
export default ImageFileInput;