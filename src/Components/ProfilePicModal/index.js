import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import profilepic from "./Profileuserpiclogo.png"
import Buttons from "../../Components/Buttons"
import { apiCall, setAccessToken } from "../../Utils/Network"



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px dashed #CFCBCF',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [imgfile,setImgfile]= React.useState(null)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const onFileUpload = () => {
    
  //   // Create an object of formData
  //   const formData = new FormData();
  
  //   // Update the formData object
  //   formData.append(
  //     "profile_pic",
  //     imgfile,
  //     imgfile.name
  //   );
  
  //   // let response = await 
  //   apiCall("useronboarding/accountonboarding", 'PUT',formData)
  //   console.log(imgfile)
  //   // fileData();

  // };

 const fileData = () => {
	
    if (imgfile) {
      
      return (
      <div>
        {/* <h2>File Details:</h2> */}
        
                <p>File Name: {imgfile.name}</p>
                
                      
                <p>File Type: {imgfile.type}</p>
                
        
  {/* <p>
        Last Modified:{" "}
        {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p> */}
  
      </div>
      );
    } else {
      return (
      <div>
        <br />
        <h4>Choose before Upload </h4>
      </div>
      );
    }
    };

    
  const body = (
    <div style={modalStyle} className={classes.paper} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div>
            <img style={{paddingLeft:"100px"}} src={profilepic}/>
            <p style={{paddingLeft:"35px"}}>Drag a Profile Photo or Browse</p>
            
            <Buttons.SecondaryButton value="Cancel" onClick={props.onClose}/>
            <Buttons.PrimaryButton value="Set Profile Photo"  
            // onClick={onFileUpload} 
            />
           
            <form action="/action_page.php">
            <input style={{borderStyle:"none"}} 
            type="file" 
            
            onChange={(e) => props.onFileSelect(e.target.files[0])} />
            </form>

    </div>
    </div>
    
  );
  

  return (
    <div >
      
      <Modal
        style={{display:"flex",justifyContent:"center",alignItems:"center"}}
        open={props.modalpage}
        onClose={props.onClose}
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
      >
        <div >
          
        {body}
        
        </div>
      </Modal>
    </div>
  );
}