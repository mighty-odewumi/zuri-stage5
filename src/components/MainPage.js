import { useState } from "react"

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function MainPage() {

  const [isSend, setIsSend] = useState(false);

  function handleSend(e) {
    e.preventDefault();
    setIsSend(true);
  }

  function handleClose(e) {
    setIsSend(false);
  }

  console.log(isSend);

  const emailPopupStyles = {
    display: `${isSend ? "block" : "none"}`,
  };

  const mainPageStyles = {
    filter: `${isSend ? "opacity(0.4)" : ""}`,
    // overflow: `${isSend ? "hidden" : ""}`
  };

  const emailPopup = (
    <div
      className="email-popup"
      style={emailPopupStyles}
    >
      
      <img src="assets/close-circle.svg" alt="" className="close-icon" onClick={handleClose}/>

      <img src="assets/success-kite.svg" alt="success kite" className="success-kite" />

      <p className="success-text">
        Your video link has been sent to&nbsp; 
        <span className="email">
          johnmark@gmail.com
        </span>
      </p>

      <p>Would you need to view this video later? Save to your account now!</p>

      <button>Save Video</button>

      <p className="signup-text">Don't have an account? 
        <a href="#">
          <span>
          Create account
          </span>
        </a>
      </p>

    </div>
  );

  return (
    <>
      <div className="page-wrapper"
        style={mainPageStyles}
      >

        <header>
          <nav>
            <div className="main-logo">
              <img src="assets/help_logo.svg" alt="logo" />
              <h3>HelpMeOut</h3>
            </div>

            <div className="features-how-it-works">
              <a href="#"><h4>Features</h4></a>
              <a href="#"> <h4>How It Works</h4></a>
            </div>

            <a href="#"><h4>Get Started</h4></a>
          </nav>
        </header>

        <main>
          <section className="video-info">
            <h1>Your video is ready!</h1>

            <p>Name</p>
            <div className="video-title-edit">
              <h3>Untitled_Video_124</h3>
              <img src="assets/edit.svg" alt="edit icon" />
            </div>

            <form onClick={handleSend}>
              <input type="email" placeholder="Enter email of receiver"/>
              <button>
                Send
              </button>
            </form>

            <h3>Video URL</h3>
            <div className="video-link">
              <p>https://www.github.com/mighty-odewumi</p>
              <span>
                <img src="assets/copy.svg" alt="copy icon"/>
                Copy
              </span>
            </div>

            <h4>Share your video</h4>
            <div className="share-social">
              <a href="#">
                <button>
                  <img src="assets/facebook.svg" alt="facebook icon"/>
                  <span>Facebook</span>
                </button>
              </a>

              <a href="#">
                <button>
                  <img src="assets/whatsapp.svg" alt="whatsapp icon" id="whatsapp-icon" />
                  <span>WhatsApp</span>
                </button>
              </a>

              <a href="#">
                <button>
                  <img src="assets/telegram.svg" alt="telegram icon"/>
                  <span>Telegram</span>
                </button>
              </a>
            </div>
          </section>

          <section className="video-transcript">
            <video controls />

            <h3>Transcript</h3>

            <select>
              <option>English</option>
              <option>Chinese</option>
            </select>

            <div className="transcripts">
              <div className="transcript">
                <span>0.01</span>
                <p>This is a translation of the highest order. This is a translation of the highest order. This is a translation of the highest order.</p>
              </div>
              
              <div className="transcript">
                <span>0.03</span>
                <p>This is a translation of the highest order. This is a translation of the highest order. This is a translation of the highest order.</p>
              </div>

              <div className="transcript">
                <span>0.05</span>
                <p>I understand this is just a transition from one greatness to another and I would have it no other way than to do something like this.</p>
              </div>

              <div className="transcript">
                <span>0.07</span>
                <p>It is a pity Lorem Ipsum didn't exist until this present age in the history of the world and that is how we have come to view them.</p>
              </div>

              <div className="transcript">
                <span>0.08</span>
                <p>This is a translation of the highest order</p>
              </div>
            </div>
          </section>

          <div className="mobile-items">

            <h1>Your video is ready!</h1>

            <p>Name</p>
            <div className="video-title-edit">
              <h3>Untitled_Video_124</h3>
              <img src="assets/edit.svg" alt="edit icon" />
            </div>
            <video controls className="mobile"/>

            <form onClick={handleSend}>
              <input type="email" placeholder="Enter email of receiver"/>
              <button>
                Send
              </button>
            </form>

            <p className="email-text">
              Your video to johnmark@gmail.com is now ready.
            </p>  

            <a href="#" className="not-receiver">Not the receiver?</a>
            
            
            <div className="share-social">

              <div className="copy-container">
                <img src="assets/copy.svg" alt="copy icon"/>
                Copy video link
              </div>

              <a href="#">
                <button>
                  <img src="assets/facebook.svg" alt="facebook icon"/>
                  
                </button>
              </a>

              <a href="#">
                <button>
                  <img src="assets/whatsapp.svg" alt="whatsapp icon" id="whatsapp-icon" />
                  
                </button>
              </a>

              <a href="#">
                <button>
                  <img src="assets/telegram.svg" alt="telegram icon"/>
                </button>
              </a>
            </div>

            <h3>Transcript</h3>
            <div className="transcripts">
              <div className="transcript">
                <span>0.01</span>
                <p>This is a translation of the highest order. This is a translation of the highest order. This is a translation of the highest order.</p>
              </div>
              
              <div className="transcript">
                <span>0.03</span>
                <p>This is a translation of the highest order. This is a translation of the highest order. This is a translation of the highest order.</p>
              </div>

              <div className="transcript">
                <span>0.05</span>
                <p>I understand this is just a transition from one greatness to another and I would have it no other way than to do something like this.</p>
              </div>

              <div className="transcript">
                <span>0.07</span>
                <p>It is a pity Lorem Ipsum didn't exist until this present age in the history of the world and that is how we have come to view them.</p>
              </div>

              <div className="transcript">
                <span>0.08</span>
                <p>This is a translation of the highest order</p>
              </div>
            </div>

          </div>

        </main>

        <section className="banner">
          <h3>
            To ensure the availability and privacy of your video, we recommend saving it to your account.
          </h3>

          <button>Save video</button>

          <p>Don't have an account? 
            <a href="#">
              <span>
              Create account
              </span>
            </a>
          </p>

        </section>

        <footer>
          <div className="main-logo">
            <img src="assets/help_logo.svg" alt="logo" />
            <h3>HelpMeOut</h3>
          </div>

          <div className="footer-sections">
            <span>Menu</span>

            <a href="#">Home</a>
            <a href="#">Converter</a>
            <a href="#">How it Works</a>
          </div>

          <div className="footer-sections">
            <span>About us</span>

            <a href="#">About</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
          </div>

          <div className="footer-sections">
            <span>Screen Record</span>

            <a href="#">Browser Window</a>
            <a href="#">Desktop</a>
            <a href="#">Application</a>
          </div>

        </footer>

      </div>

      {
        isSend 
          ? emailPopup
          : ""
      }

    </>   
  )
}
