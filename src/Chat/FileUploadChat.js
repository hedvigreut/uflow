import React from 'react';
import Dropzone from 'react-dropzone';
import { modelInstance } from '../data/model';



const FileUploadChat = ({children}) => (
  <Dropzone className= "ignore" onDrop = {(files) => modelInstance.handleFileSelectChat(files)}>
  {children}
  </Dropzone>
);


export default FileUploadChat;
