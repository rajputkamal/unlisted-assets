import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useDropzone } from "react-dropzone";
import RootRef from "@material-ui/core/RootRef";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CloudUpload from "@material-ui/icons/CloudUpload";
import clsx from "clsx";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import './index.css';
import filePaper from "./file-paper.png"
import Xlfile from "./xlsx.png";
import FileNotSupport from "./FileNotSupport.png";
import Download from "./Download";
const useStyles = makeStyles((theme) => ({
  dropzoneContainer: {
    height: 300,
    background: "#f2f3f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: "#aaa",
    borderWidth: "2px",
    padding:"20px",
    textAlign:"center",
    color:"#721a65"
  },
  preview: {
    width: 200,
    height: 200,
    margin: "auto",
    display: "block",
    marginBottom: theme.spacing(1),
    objectFit: "contain",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function FileUpload() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [file, setFile] = React.useState();
  const [preview, setPreview] = React.useState();
  const [percent, setPercent] = React.useState(0);
  const [downloadUri, setDownloadUri] = React.useState();
  const [isexcelfile, setIsexcelfile] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
 
  const onDrop = React.useCallback((acceptedFiles) => {

    setFile(acceptedFiles[0]);
    const filenameArray = acceptedFiles[0].name.split('.');
    const extension=filenameArray[1];
  
    if(extension == 'xlsx' || extension == 'xls' || extension == 'xlsb' || extension == 'xlsm' )
    {
      setIsexcelfile(true);
    }

    const previewUrl = URL.createObjectURL(acceptedFiles[0]);
    setPreview(previewUrl);
    setSuccess(false);
    setPercent(0);
  });

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  const { ref, ...rootProps } = getRootProps();

  const uploadFile = async () => {
    try {
      setSuccess(false);
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      // // console.log("file", file);
      const API_URL = "http://localhost:3001/files";
      const response = await axios.put(API_URL, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercent(percentCompleted);
        },
      });

      setDownloadUri(response.data.fileDownloadUri);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      // alert(err.message);
    }
  };


  return (
    <>
    <div className="user-admin-section">
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Grid container>
            <Grid item xs={6} className="px-3 py-3 " >
              <Typography align="center" variant="p" >
                <span className="text-default"><b>Select Your File -</b></span>
              </Typography>
              <Divider className="mb-2"/>
              <div className="cursor-pointer">
              <RootRef rootRef={ref} >
                <Paper
                  {...rootProps}
                  elevation={0}
                  className={classes.dropzoneContainer}
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, <br/> Or click to select files</p>
                </Paper>
              </RootRef>
              </div>
              
            </Grid>

            <Grid item xs={6} className="px-3 py-3">
              <Typography align="center" variant="p" >
                <span className="text-default"><b>Preview Your File -</b></span>
              </Typography>
              <Divider className="mb-2"/>
              {
                isexcelfile ? 
               <> 
               <img className={classes.preview}
                src={Xlfile} /> 
                <h6 className="text-center text-success m-0">Click To Upload</h6>
                </> : <> <img
                onLoad={() => URL.revokeObjectURL(preview)}
                className={classes.preview}
                src={FileNotSupport || filePaper} 
              /> <h6 className="text-center text-danger mt-2">No Choose File ..</h6></>
              }
              {file && (
               
                <>
                  <Grid
                    container
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={2}>
                      <div className={classes.wrapper}>
                        <Fab
                          aria-label="save"
                          color="primary"
                          className={buttonClassname}
                          onClick={uploadFile}
                        >
                          {success ? <CheckIcon /> : <CloudUpload />}
                        </Fab>
                        {loading && (
                          <CircularProgress
                            size={68}
                            className={classes.fabProgress}
                          />
                        )}
                      </div>
                    </Grid>
                    {
                isexcelfile ? 
                    <Grid item xs={10}>
                      {file && (
                       
                        <Typography variant="body">{file.name}</Typography>
                      
                      )}
                      {loading && (
                        <div>
                          <LinearProgress
                            variant="determinate"
                            value={percent}
                          />
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body">{percent}%</Typography>
                          </div>
                        </div>
                      )}

                      { success && (
                        <Typography>
                          File Upload Success!{" "}
                          <a href={downloadUri} target="_blank">
                            File Url
                          </a>
                        </Typography>
                      )}
                    </Grid>
                    : <h6 className="text-danger text-center mx-2">Sorry File Type not support</h6> 
                    }
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Divider className="mb-2"/>

          <div className="download-files-section">
            <Download />
          </div>
        </Paper>
      </Container>
      </div>
    </>
  );
}

export default FileUpload;
