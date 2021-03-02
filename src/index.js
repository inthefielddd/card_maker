import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import AuthService from './service/auth_service';
import ImageFileInput from './components/image_file_input/image_file_input';
import ImageUploader from './service/image_uploader';

//service
const authService = new AuthService();
const imageUploader = new ImageUploader();

//새로운 component에 props를 받으면
//원하는 props을 전달하면 그 prop을 그대로 다시 전달한다
//확장 가능한 component
const FileInput = (props) => <ImageFileInput {...props} imageUploader={imageUploader} />;

ReactDOM.render(
    <React.StrictMode>
        <App authService={authService} FileInput={FileInput} />
    </React.StrictMode>,
    document.getElementById('root')
);
