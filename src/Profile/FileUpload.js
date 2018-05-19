import React from 'react';
import Dropzone from 'react-dropzone';
import { modelInstance } from '../data/model';

const FileUpload = ({children}) => (
  <Dropzone className= "ignore" onDrop = {(files) => modelInstance.handleFileSelect(files)}>
  {children}
  </Dropzone>
);
export default FileUpload;
