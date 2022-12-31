import React from "react";
import useFileDownloader from "./useFileDownloader";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import fileImage from "./xlsx.png";
const files = [
  {
    name: "Adminslist.xlsx",
    thumb:
      "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=427&q=80 427w",
    file:
      "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?rnd=" +
      Math.random(),
    filename: "photo-1.jpg",
  },
  {
    name: "Adminslist2.xlsx",
    thumb:
      "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=427&q=80 427w",
    file:
      "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?rnd=" +
      Math.random(),
    filename: "photo-2.jpg",
  },
  
];

const FileDownloader = () => {
  const [downloadFile, downloaderComponentUI] = useFileDownloader();

  const download = (file) => downloadFile(file);

  return (
    <>
      <div className="row mx-1">
        <div className="col text-center my-3">
          <h6 className="text-default"><b> Downloads Your Files Here -</b></h6>
          <div className="row mt-3">
            {files.map((file, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card ">
                  <div className="card-body" key={idx}>
                    {/* <img className="card-img-top mb-3" src={file.thumb} /> */}
                    <img className="mb-3" width="100" src={fileImage} />

                    <h5 className="card-title">{file.name}</h5>

                    <button
                      className="btn btn-primary-default cursor-pointer text-white"
                      onClick={() => download(file)}
                    ><CloudDownloadIcon className="text-white mr-2"/>
                      Download Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {downloaderComponentUI}
      </div>
    </>
  );
};

export default FileDownloader;