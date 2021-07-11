import React, { useState } from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import BottomAction from '../BottomAction/BottomAction';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import { postFile } from '../../services/fileServices'


const UploadQuestion = () => {
    const distpatch = useDispatch();
    const [files, setFiles] = useState([]);
    const questions = useSelector(state => state.QuestionsReducer);

    const handleChange = (files) => {
        setFiles(files);
    }

    const handleSubmit = () => {
        let formData = new FormData();
        if (files.length > 0) {
            formData.append("file", files[0]);
            formData.append("currentId", questions.length)
            distpatch(postFile(formData));
        }
    }

    const actions = [
        {
            color: 'primary',
            isSubmit: false,
            onClick: handleSubmit,
            label: 'Thêm Câu Hỏi',
            size: 'large',
            endIcon: AddBoxIcon,
            isDisable: files.length > 0 ? false : true
        }
    ];


    return (
        <>
            <DropzoneArea
                onChange={handleChange}
                dropzoneText="Bấm vào hoặc kéo thả file vào đây"
                showFileNames
                acceptedFiles={['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain' ]}
                filesLimit={1}
                maxFileSize={25000000}
            />
            <BottomAction actions={actions} />
        </>
    )
}

export default UploadQuestion;