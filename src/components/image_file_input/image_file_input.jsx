import React, { useRef, useState } from "react";
import styles from "./image_file_input.module.css";

const ImageFileInput = ({imageUploader, name, onFileChange}) => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const onButtonClick = (event) =>{
        event.preventDefault();
        inputRef.current.click();
    }

    //파일이 url로 변경 될때
    const onChange = async event =>{
        setLoading(true);
        const uploaded = await imageUploader.upload(event.target.files[0]); //파일다 받아왔을떄
        setLoading(false);
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
            {!loading && (
             <button className={`${styles.button} ${name ? styles.pink: styles.grey}`} onClick={onButtonClick}>
                 {name || 'No File'}
             </button>
             
            )}
           
            {
            //로딩중일떄
            loading &&  <div className={styles.loading}></div>
            }
          
        </div>
 
    )
    }
export default ImageFileInput;