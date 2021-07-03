import React, { useState } from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import BottomAction from '../BottomAction/BottomAction';
import AddBoxIcon from '@material-ui/icons/AddBox';


const UploadQuestion = () => {
    const [files, setFiles] = useState([]);
    const handleChange = (files) => {
        console.log(files);
        
    }
    const actions = [
        {
            color: 'primary',
            isSubmit: false,
            label: 'Thêm Câu Hỏi',
            size: 'large',
            endIcon: AddBoxIcon,
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