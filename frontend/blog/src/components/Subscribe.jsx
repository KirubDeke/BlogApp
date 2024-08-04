import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/SubscribeStyle.css';
function Subscribe(){
    return(
       <>
          <div className="section-3">
            <div className="sub-section1">
                <h3>Take Action and Get Results</h3>
                <p>Join our newslatters for latest update and insights.</p>
            </div>
            <div className="sub-section2">
            <Form.Control type="text" placeholder="Email ..." readOnly/>
            <Button className='btn-subscribe'>Subscribe</Button>
            </div>
          </div>
       </>
    )
}export default Subscribe;