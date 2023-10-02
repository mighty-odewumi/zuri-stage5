import { useState, useEffect, useRef } from "react";


export default function Popup() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [video, setVideo] = useState([]);

  const controlsRef = useRef(null);
  const [controlsPosition, setControlsPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Load any necessary scripts or perform setup here
    // For example, you can load external scripts for streaming to the backend
  }, []);

  const startRecording = async () => {
    if (navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            mediaSource: "screen",
          },
          audio: true,
        });

        const data = [];

        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);

        mediaRecorder.ondataavailable = (e) => {
          data.push(e.data);
          console.log(data);
          console.log(e.data);
          streamToBackend(e.data);
        };

        mediaRecorder.start();
        setIsRecording(true);

        mediaRecorder.onstop = (e) => {
          setVideo(URL.createObjectURL(new Blob(data, {type: data[0].type,
          })));
        };
      }
      catch (error) {
        alert("Error setting up screen sharing", error);
      }
    }
  };

  function handleStart() {
    // eslint-disable-next-line no-undef
    // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    //   const activeTabId = tabs[0].id;
    //   console.log(activeTabId);

      // eslint-disable-next-line no-undef
    //   chrome.scripting.executeScript({
    //     // code: `${startCapture} startCapture();`

    //     target: {tabId: activeTabId},
    //     func: startRecording,
    //   })
    //   .then(result => {
    //     console.log("Done",result);
    //   });
    // });

    // eslint-disable-next-line no-undef
    chrome.action.onClicked.addListener(async (tab) => {
  
      try {
        // eslint-disable-next-line no-undef
        await chrome.scripting.executeScript({
        // code: `${startCapture} startCapture();`

        target: {tabId: tab.id},
        func: startRecording,
        })
      }
      catch (err) {
        console.log("AN error occurred", err);
      }
    });
  }

  // Other functions (stopRecording, pauseRecording, resumeRecording) remain the same

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      console.log("this is video after stop", video);
      // setTimeout(() => {
      //   window.location.href="https://www.google.com";
      // }, 5000);
      
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && !isPaused) {
      mediaRecorder.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && isPaused) {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

  
  const streamToBackend = (data) => {
    // You should implement the logic to send the data to your backend
    // Here is a simplified example using fetch, adapt this to your backend API
    fetch("https://hng-screen-recorder-api.azurewebsites.net/api/upload-chunk", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent to backend successfully.");
        } else {
          console.error("Failed to send data to backend.");
        }
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  const handleControlsDragStart = (e) => {
    const controls = controlsRef.current;
    if (controls) {
      const controlsRect = controls.getBoundingClientRect();
      const offsetX = e.clientX - controlsRect.left;
      const offsetY = e.clientY - controlsRect.top;
      setIsDragging(true);
      setControlsPosition({ x: offsetX, y: offsetY });
    }
  };

  const handleControlsDrag = (e) => {
    if (isDragging) {
      const newX = e.clientX - controlsPosition.x;
      const newY = e.clientY - controlsPosition.y;
      setControlsPosition({ x: newX, y: newY });
    }
  };

  const handleControlsDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className="popup-wrapper">
        <div className="popup-header">
          <div className="logo">
            <img src="assets/help_logo.svg" alt="" />
            <h3 className="popup-logo-text">HelpMeOut</h3>
          </div>

          <div className="popup-header--icons">
            <img src="assets/setting-2.svg" alt="" className="popup-settings-icon"/>
            <img src="assets/close-circle.svg" alt="" className="popup-close-icon"/>
          </div>
        </div>

        <p>This extension helps you record and share help videos with ease.</p>

        <div className="tab-selectors">
          <div className="first-tab tab-selector">
            <img src="assets/monitor.svg" alt="" />
            <p>Full screen</p>
          </div>

          <div className="second-tab tab-selector">
            <img src="assets/tab.svg" alt="" />
            <p>Current Tab</p>
          </div>
        </div>

        <div className="toggle-permission">
          <div className="toggle-desc">
            <img src="assets/video-camera.svg" alt="" />
            <span>Camera</span>
          </div>

          <div className="toggle-slider">
            <div className="toggle-circle"></div>
          </div>
        </div>

        <div className="toggle-permission">
          <div className="toggle-desc">
            <img src="assets/microphone.svg" alt="" />
            <span>Audio</span>
          </div>

          <div className="toggle-slider">
            <div className="toggle-circle"></div>
          </div>
        </div>

        <button onClick={startRecording} className="popup-btn">Start Recording</button>
      </div>

      <video id="video" src={video} controls/>

      {true
        ? (
          <div
            className={`screen-ctrls ${isDragging ? "dragging" : ""}`}
            ref={controlsRef}
            style={{ left: controlsPosition.x, top: controlsPosition.y }}
            onMouseDown={handleControlsDragStart}
            onMouseMove={handleControlsDrag}
            onMouseUp={handleControlsDragEnd}
        >
          <span className="screen-ctrls--time">Time</span>

          <span className="screen-ctrls--divider"></span>

          <div className="ctrls">
            <button onClick={pauseRecording}>
              <img src="assets/pause.svg" alt="" />
            </button> 
            <span>Pause</span>
          </div>

          <div className="ctrls">
            <button onClick={stopRecording}>
              <img src="assets/stop.svg" alt="" />
            </button>
            <span>Stop</span>
          </div>

          <div className="ctrls">
            <img src="assets/rec_camera.svg" alt="" />
            <span>Camera</span>
          </div>

          <div className="ctrls">
            <img src="assets/rec_mic.png" alt="" />
            <span>Mic</span>
          </div>

          <img src="assets/trash.svg" alt="trash icon" className="screen-ctrls--trash"/>
        </div>
        ) 
          
        : (
          null
        )
      }
    </>
  );
}
